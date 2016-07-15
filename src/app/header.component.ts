import { Component } from '@angular/core';
import {DropdownDirective} from "./dropdown.directive";

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  directives: [DropdownDirective]
})
export class HeaderComponent {
}
