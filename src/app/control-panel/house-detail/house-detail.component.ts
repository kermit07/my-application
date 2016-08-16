import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {House} from "../../shared/house";
import {ControlPanelService} from "../control-panel.service";
import {TempSensorListComponent} from "./temp-sensor-list.component";
import {LightListComponent} from "./light-list.component";

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
  private routeSub:Subscription;
  private housesSub:Subscription;
  private types = ElemType;                           // let to work switch correctly
  private elemType:ElemType = ElemType.TempSensor;    // real type (used in view only)


  constructor(private router:Router,
              private route:ActivatedRoute,
              private service:ControlPanelService) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params:any) => {
        this.houseIndex = +params['id'];

        if(this.service.getHouse(this.houseIndex) == undefined) {
          this.router.navigate(['/control-panel']);
          return;
        }

        this.selectedHouse = this.service.getHouse(this.houseIndex);
      }
    );
    this.housesSub = this.service.housesChange.subscribe(
      (houses:House[]) => {
        this.selectedHouse = houses[this.houseIndex];
      }
    )
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.housesSub.unsubscribe();
  }

  onEdit() {
    this.router.navigate(['/control-panel', this.houseIndex, 'edit']);
  }

  onDelete() {
    if(window.confirm("Czy na pewno chcesz usunąć?"))
      this.service.deleteHouse(this.houseIndex);
    this.router.navigate(['/control-panel']);
  }
}
