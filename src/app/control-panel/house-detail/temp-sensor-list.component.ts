import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";

import {TempSensorItemComponent} from "./temp-sensor-item.component";
import {ControlPanelService} from "../control-panel.service";
import {TempSensor} from "../../shared/temp-sensor";

@Component({
  moduleId: module.id,
  selector: 'app-temp-sensor-list',
  templateUrl: 'temp-sensor-list.component.html',
  directives: [TempSensorItemComponent]
})
export class TempSensorListComponent implements OnInit, OnDestroy {
  private subscription:Subscription;
  private houseIndex:number;
  private tempSensors:TempSensor[];

  constructor(private route:ActivatedRoute,
              private service:ControlPanelService) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params:any) => {
        if (params.hasOwnProperty('id')) {
          this.houseIndex = +params['id'];
          this.tempSensors = this.service.getHouse(this.houseIndex).tempSensors;
        } else {
          this.tempSensors = null;
        }
      }
    );
  }

  ngOnDestroy():any {
    this.subscription.unsubscribe();
  }
}
