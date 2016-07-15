import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HouseItemComponent} from "./house-item.component";
import {House} from "../../shared/house";

@Component({
  moduleId: module.id,
  selector: 'app-house-list',
  templateUrl: 'house-list.component.html',
  directives: [HouseItemComponent]
})
export class HouseListComponent implements OnInit {
  houses:House[] = [
    new House('Project 1', 'Maciek', 'https://www.uktights.com/tightsimages/products/normal/gi_OTK-Double-Stripe-Tights.jpg', []),
    new House('Project 2', 'Ja', 'http://thumbs.ebaystatic.com/images/g/wl0AAOSwbwlXBlQu/s-l225.jpg', []),
    new House('Project 3', 'Mistrz', 'https://www.uktights.com/tightsimages/products/normal/pm_Floral-Suspender-Tights.jpg', [])
  ];
  @Output() selectedHouse = new EventEmitter<House>()

  constructor() {
  }

  ngOnInit() {
  }

  onSelected(house:House) {
    this.selectedHouse.emit(house);
  }

}
