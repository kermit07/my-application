import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";

import {HouseListComponent} from "./house-list";

@Component({
  moduleId: module.id,
  selector: 'app-control-panel',
  templateUrl: 'control-panel.component.html',
  directives: [HouseListComponent, ROUTER_DIRECTIVES]
})
export class ControlPanelComponent {

}
