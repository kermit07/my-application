import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";

import {House} from "../../shared/house";

@Component({
  moduleId: module.id,
  selector: 'app-house-item',
  templateUrl: 'house-item.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class HouseItemComponent {
  @Input() house:House;
  @Input() houseIndex:number;
}
