import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";

import {House} from "../../shared/house";
import {ControlPanelService} from "../control-panel.service";
import {TempSensorListComponent} from "./temp-sensor-list.component";
import {TempSensor} from "../../shared/temp-sensor";
import {LightListComponent} from "./light-list.component";
import {Light} from "../../shared/light";

enum ElemType {TempSensor, Light}

@Component({
  moduleId: module.id,
  selector: 'app-house-detail',
  templateUrl: 'house-detail.component.html',
  directives: [TempSensorListComponent, LightListComponent]
})
export class HouseDetailComponent implements OnInit, OnDestroy {
  private selectedHouse:House;
  private houseIndex:number;
  private subsribtion:Subscription;
  private types = ElemType;                    // let to work switch correctly
  private elemType: ElemType = ElemType.TempSensor;   // real type


  constructor(private router:Router,
              private route:ActivatedRoute,
              private controlPanelService:ControlPanelService) {
  }

  ngOnInit() {
    this.subsribtion = this.route.params.subscribe(
      (params:any) => {
        this.houseIndex = params['id'];
        this.selectedHouse = this.controlPanelService.getHouse(this.houseIndex);
      }
    );
  }

  ngOnDestroy() {
    this.subsribtion.unsubscribe();
  }

  onEdit() {
    this.router.navigate(['/control-panel', this.houseIndex, 'edit']);
  }

  onDelete() {
    this.controlPanelService.deleteHouse(this.houseIndex);
    this.router.navigate(['/control-panel']);
  }
}
