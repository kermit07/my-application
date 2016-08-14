import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {FORM_PROVIDERS, Location} from "@angular/common";
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
  private isNew:boolean;
  private house:House;

  constructor(private route:ActivatedRoute,
              private service:ControlPanelService,
              private formBuilder:FormBuilder,
              private location: Location) {
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
    const newHouse = this.houseForm.value;
    if (this.isNew) {
      this.service.addHouse(newHouse);
    } else {
      this.service.editHouse(this.house, newHouse);
    }
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }

  private initForm() {
    let houseName = '';
    let houseOwner = '';
    let houseImgUrl = '';

    if (!this.isNew) {
      houseName = this.house.name;
      houseOwner = this.house.owner;
      houseImgUrl = this.house.imagePath;
    }
    this.houseForm = this.formBuilder.group({
      name: [houseName, Validators.required],
      owner: [houseOwner, Validators.required],
      imagePath: [houseImgUrl, Validators.required],
    });
  }
}
