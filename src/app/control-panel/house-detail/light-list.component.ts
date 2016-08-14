import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";
import {ControlPanelService} from "../control-panel.service";
import {Light} from "../../shared/light";
import {LightItemComponent} from "./light-item.component";

@Component({
  moduleId: module.id,
  selector: 'app-light-list',
  templateUrl: 'light-list.component.html',
  directives: [LightItemComponent]
})
export class LightListComponent implements OnInit, OnDestroy {

  private subscription:Subscription;
  private houseIndex:number;
  private lights:Light[];

  constructor(private route:ActivatedRoute,
              private service:ControlPanelService) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params:any) => {
        if (params.hasOwnProperty('id')) {
          this.houseIndex = +params['id'];
          let xxx = this.service.getHouse(this.houseIndex);
          if(xxx.hasOwnProperty('lights')) // TODO
            this.lights = xxx.lights;
          else
            this.lights = [];//this.service.getHouse(this.houseIndex).tempSensors;
        } else {
          this.lights = null;
        }
      }
    );
  }

  ngOnDestroy():any {
    this.subscription.unsubscribe();
  }

}
