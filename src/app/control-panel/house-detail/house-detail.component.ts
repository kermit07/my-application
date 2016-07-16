import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";

import {House} from "../../shared/house";
import {ControlPanelService} from "../control-panel.service";

@Component({
  moduleId: module.id,
  selector: 'app-house-detail',
  templateUrl: 'house-detail.component.html'
})
export class HouseDetailComponent implements OnInit, OnDestroy {
  selectedHouse:House;
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
}
