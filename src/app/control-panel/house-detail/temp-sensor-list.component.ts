import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {House} from "../../shared/house";
import {TempSensor} from "../../shared/temp-sensor";
import {ControlPanelService} from "../control-panel.service";
import {TempSensorItemComponent} from "./temp-sensor-item.component";

@Component({
  moduleId: module.id,
  selector: 'app-temp-sensor-list',
  templateUrl: 'temp-sensor-list.component.html',
  directives: [TempSensorItemComponent]
})
export class TempSensorListComponent implements OnInit, OnDestroy {
  private routeSub:Subscription;
  private housesSub:Subscription;
  private houseIndex:number;
  private house:House;
  private tempSensors:TempSensor[];

  constructor(private router:Router,
              private route:ActivatedRoute,
              private service:ControlPanelService) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params:any) => {
        this.houseIndex = +params['id'];
        this.house = this.service.getHouse(this.houseIndex);
        this.tempSensors = [];

        // back to control-panel view if not found house in service database
        if (this.house == undefined) {
          this.router.navigate(['/control-panel']);
          return;
        }

        this.tempSensors = this.house.tempSensors;
      }
    );
    this.housesSub = this.service.housesChange.subscribe(
      (houses:House[]) => {
        this.house = houses[this.houseIndex];
        this.tempSensors = this.house.tempSensors;
      }
    )
  }

  ngOnDestroy():any {
    this.routeSub.unsubscribe();
    this.housesSub.unsubscribe();
  }

  onAddSensor() {
    this.tempSensors.push(new TempSensor(20, 0, 0, 0));
    this.house.tempSensors = this.tempSensors;
  }

  onSendSensors() {
    this.service.editHouse(this.houseIndex, this.house);
  }
}
