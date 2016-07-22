import {Injectable} from '@angular/core';
import {House} from "../shared/house";
import {TempSensor} from "../shared/temp-sensor";

@Injectable()
export class ControlPanelService {
  private houses:House[] = [
    new House('Project 1', 'Maciek', 'https://www.uktights.com/tightsimages/products/normal/gi_OTK-Double-Stripe-Tights.jpg', [
      new TempSensor(24, 1,3,5),
      new TempSensor(22, 2,5,6),
      new TempSensor(25, 4,1,1),
      new TempSensor(23.2, 11,2,7),
      new TempSensor(21.23, 7,33,56),
      new TempSensor(25.12, 16,7,4),
      new TempSensor(19.03, 5,5,53),
      new TempSensor(3.12, 7,3,52)
    ]),
    new House('Project 2', 'Ja', 'http://thumbs.ebaystatic.com/images/g/wl0AAOSwbwlXBlQu/s-l225.jpg', []),
    new House('Project 3', 'Mistrz', 'https://www.uktights.com/tightsimages/products/normal/pm_Floral-Suspender-Tights.jpg', [])
  ];

  constructor() {
  }

  getHouses() {
    return this.houses;
  }

  getHouse(houseIndex:number) {
    return this.houses[houseIndex];
  }

  deleteHouse(house:House) {
    this.houses.splice(this.houses.indexOf(house), 1);
  }

  addHouse(house:House) {
    this.houses.push(house);
  }

  editHouse(oldHouse:House, newHouse:House) {
    this.houses[this.houses.indexOf(oldHouse)] = newHouse;
  }
}
