import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";

import {House} from "../../shared/house";
import {ControlPanelService} from "../control-panel.service";
import {TempSensorListComponent} from "./temp-sensor-list.component";
import {TempSensor} from "../../shared/temp-sensor";
import {LightListComponent} from "./light-list.component";
import {Light} from "../../shared/light";

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
    this.controlPanelService.deleteHouse(this.selectedHouse);
    this.router.navigate(['/control-panel']);
  }

  onAddSensor() {
    this.selectedHouse.tempSensors.push(new TempSensor(20, 0, 0, 0));
  }

  onAddLight() {
    this.selectedHouse.lights.push(new Light(this.controlPanelService.getLightKinds()[0], 0, 0, 0));
  }
}
