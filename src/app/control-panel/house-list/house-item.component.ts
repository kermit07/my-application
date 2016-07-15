import {Component, OnInit, Input} from '@angular/core';
import {House} from "../../shared/house";

@Component({
  moduleId: module.id,
  selector: 'app-house-item',
  templateUrl: 'house-item.component.html'
})
export class HouseItemComponent implements OnInit {
  @Input() house: House;
  projectId: number;

  constructor() {}

  ngOnInit() {
  }

}
