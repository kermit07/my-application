import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {DropdownDirective} from "./dropdown.directive";

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  directives: [DropdownDirective, ROUTER_DIRECTIVES]
})
export class HeaderComponent {
}
