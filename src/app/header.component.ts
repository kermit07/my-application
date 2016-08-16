import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {DropdownDirective} from "./dropdown.directive";

import {ControlPanelService} from "./control-panel/control-panel.service";

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  directives: [DropdownDirective, ROUTER_DIRECTIVES]
})
export class HeaderComponent {

  constructor(private service: ControlPanelService) {};

  onStore() {
    this.service.storeData();
  }

  onFetch() {
    this.service.fetchData();
  }

}
