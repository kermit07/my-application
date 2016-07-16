import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";

import {HouseItemComponent} from "./house-item.component";
import {House} from "../../shared/house";
import {ControlPanelService} from "../control-panel.service";

@Component({
  moduleId: module.id,
  selector: 'app-house-list',
  templateUrl: 'house-list.component.html',
  directives: [HouseItemComponent, ROUTER_DIRECTIVES]
})
export class HouseListComponent implements OnInit {
  houses:House[] = [];

  constructor(private controlPanelService:ControlPanelService) {
  }

  ngOnInit() {
    this.houses = this.controlPanelService.getHouses();
  }

}
