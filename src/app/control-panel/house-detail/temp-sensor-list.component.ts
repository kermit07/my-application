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
  private subscribtion2:Subscription;
  private houseIndex:number;
  private tempSensors:TempSensor[] = [];

  constructor(private router:Router,
              private route:ActivatedRoute,
              private service:ControlPanelService) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params:any) => {
        this.houseIndex = +params['id'];
        let house = this.service.getHouse(this.houseIndex);

        // back to control-panel view if not found house in service database
        if (house == undefined) {
          this.router.navigate(['/control-panel']);
          return;
        }

        this.tempSensors = house.tempSensors;
      }
    );
    this.subscribtion2 = this.service.housesChange.subscribe(
      (houses:House[]) => {
        this.tempSensors = houses[this.houseIndex].tempSensors;
      }
    )
  }

  ngOnDestroy():any {
    this.routeSub.unsubscribe();
    this.subscribtion2.unsubscribe();
  }

  onAddSensor() {
    this.tempSensors.push(new TempSensor(20, 0, 0, 0));
  }
}
