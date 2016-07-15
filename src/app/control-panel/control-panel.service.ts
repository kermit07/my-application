import { Injectable } from '@angular/core';
import {House} from "../shared/house";

@Injectable()
export class ControlPanelService {
  private houses:House[] = [
    new House('Project 1', 'Maciek', 'https://www.uktights.com/tightsimages/products/normal/gi_OTK-Double-Stripe-Tights.jpg', []),
    new House('Project 2', 'Ja', 'http://thumbs.ebaystatic.com/images/g/wl0AAOSwbwlXBlQu/s-l225.jpg', []),
    new House('Project 3', 'Mistrz', 'https://www.uktights.com/tightsimages/products/normal/pm_Floral-Suspender-Tights.jpg', [])
  ];
  constructor() {}

  getHouses() {
    return this.houses;
  }
}
