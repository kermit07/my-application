import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {FORM_PROVIDERS} from "@angular/common";
import {FormGroup, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES} from "@angular/forms";

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
  private house:House;
  private isNew:boolean;

  constructor(private router:Router,
              private route:ActivatedRoute,
              private service:ControlPanelService,
              private formBuilder:FormBuilder) {
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

  onSubmit() {
    let newHouse:House = this.houseForm.value;

    if(this.isNew) {
      newHouse.tempSensors = [];
      newHouse.lights = [];

      this.service.addHouse(newHouse);

    } else {
      newHouse.tempSensors = this.house.tempSensors;
      newHouse.lights = this.house.lights;

      this.service.editHouse(this.houseIndex, newHouse);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/control-panel']);
}

  private initForm() {
    let houseName = '';
    let houseOwner = '';
    let houseModelPath = '';
    let houseImgUrl = '';

    if (!this.isNew) {
      houseName = this.house.name;
      houseOwner = this.house.owner;
      houseModelPath = this.house.modelPath;
      houseImgUrl = this.house.imagePath;
    }
    this.houseForm = this.formBuilder.group({
      name: [houseName, Validators.required],
      owner: [houseOwner, Validators.required],
      modelPath: [houseModelPath, Validators.required],
      imagePath: [houseImgUrl, Validators.required],
    });
  }
}
