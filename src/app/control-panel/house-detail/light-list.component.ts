import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";

import {House} from "../../shared/house";
import {Light} from "../../shared/light";
import {ControlPanelService} from "../control-panel.service";
import {LightItemComponent} from "./light-item.component";

@Component({
  moduleId: module.id,
  selector: 'app-light-list',
  templateUrl: 'light-list.component.html',
  directives: [LightItemComponent]
})
export class LightListComponent implements OnInit, OnDestroy {
  private routeSub:Subscription;
  private housesSub:Subscription;
  private houseIndex:number;
  private lights:Light[];

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

        this.lights = house.lights;
      }
    );
    this.housesSub = this.service.housesChange.subscribe(
      (houses:House[]) => {
        this.lights = houses[this.houseIndex].lights;
      }
    )
  }

  ngOnDestroy():any {
    this.routeSub.unsubscribe();
    this.housesSub.unsubscribe();
  }

  onAddLight() {
    this.lights.push(new Light(this.service.getLightKinds()[0], 0, 0, 0));
  }
}
