import {Component, OnInit, Input, Output, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {TempSensor} from "../../shared/temp-sensor";
import {ControlPanelService} from "../control-panel.service";
import {Subscription} from "rxjs/Rx";
import {House} from "../../shared/house";

@Component({
  moduleId: module.id,
  selector: 'app-temp-sensor-item',
  templateUrl: 'temp-sensor-item.component.html',
  styleUrls: ['item.component.css']
})
export class TempSensorItemComponent implements OnInit, OnDestroy {
  private routeSub:Subscription;
  private selectedHouse:House;
  @Input() tempSensor:TempSensor;
  @Input() index:number;

  constructor(private router:Router,
              private route:ActivatedRoute,
              private service:ControlPanelService) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params:any) => {
        let houseIndex = params['id'];
        this.selectedHouse = this.service.getHouse(houseIndex);
      }
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onDelete() {
    this.selectedHouse.tempSensors.splice(this.index, 1);
  }

  mkFixed(input, fixed) {
    input.value = parseFloat(input.value).toFixed(fixed);
  }

}
