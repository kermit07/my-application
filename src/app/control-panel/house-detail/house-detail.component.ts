import {Component, OnInit, Input} from '@angular/core';
import {House} from "../../shared/house";

@Component({
  moduleId: module.id,
  selector: 'app-house-detail',
  templateUrl: 'house-detail.component.html'
})
export class HouseDetailComponent implements OnInit {
  @Input() selectedHouse: House;

  constructor() {}

  ngOnInit() {
  }

}
