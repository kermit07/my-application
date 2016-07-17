import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {FORM_PROVIDERS} from "@angular/common";
import {FormArray, FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES} from "@angular/forms";

import {ControlPanelService} from "../control-panel.service";
import {House} from "../../shared/house";

@Component({
  moduleId: module.id,
  selector: 'app-house-edit',
  templateUrl: 'house-edit.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES],
  providers: [FORM_PROVIDERS]
})
export class HouseEditComponent implements OnInit, OnDestroy {
  private houseForm:FormGroup;
  private subscription:Subscription;
  private houseIndex:number;
  private isNew:boolean;
  private house:House;

  constructor(private route:ActivatedRoute,
              private service:ControlPanelService,
              private formBuilder:FormBuilder,
              private router:Router) {
  }

  ngOnInit() {
    this.isNew = true;
    this.subscription = this.route.params.subscribe(
      (params:any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.houseIndex = +params['id'];
          this.house = this.service.getHouse(this.houseIndex);
        } else {
          this.isNew = true;
          this.house = null;
        }
        this.initForm();
      }
    );
  }

  ngOnDestroy():any {
    this.subscription.unsubscribe();
  }

  private navigateBack() {
    this.router.navigate(['../']);
  }

  onSubmit() {
    const newHouse = this.houseForm.value;
    if (this.isNew) {
      this.service.addHouse(newHouse);
    } else {
      this.service.editHouse(this.house, newHouse);
    }
    this.navigateBack();
  }

  onCancel() {
    this.navigateBack();
  }

  onAddTempSensor(value:string, xPos:string) {
    (<FormArray>this.houseForm.controls['tempSensors']).push(
      new FormGroup({
        value: new FormControl(value, Validators.required),
        xPos: new FormControl(xPos, [Validators.required, Validators.pattern("\\d+")])
      })
    )
  }

  onRemoveTempSensor(index:number) {
    (<FormArray>this.houseForm.controls['tempSensors']).removeAt(index);
  }

  private initForm() {
    let houseName = '';
    let houseOwner = '';
    let houseImgUrl = '';
    let houseTempSensors:FormArray = new FormArray([]);

    if (!this.isNew) {
      houseName = this.house.name;
      houseOwner = this.house.owner;
      houseImgUrl = this.house.imagePath;
      for (let i = 0; i < this.house.tempSensors.length; i++) {
        houseTempSensors.push(
          new FormGroup({
            value: new FormControl(this.house.tempSensors[i].value, Validators.required),
            xPos: new FormControl(this.house.tempSensors[i].xPos, [Validators.required, Validators.pattern("\\d+")])
          })
        );
      }
    }
    this.houseForm = this.formBuilder.group({
      name: [houseName, Validators.required],
      owner: [houseOwner, Validators.required],
      imagePath: [houseImgUrl, Validators.required],
      tempSensors: houseTempSensors
    });
  }
}
