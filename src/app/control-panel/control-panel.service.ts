import {Injectable, EventEmitter} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {House} from "../shared/house";
import {TempSensor} from "../shared/temp-sensor";
import {Light,} from "../shared/light";

@Injectable()
export class ControlPanelService {
  housesChange = new EventEmitter<House[]>();

  private lightKinds:String[] = [
    "#ffff00",
    "#ff0000",
    "#00ff00",
    "#0000ff"
  ]

  private houses:House[] = [
    new House('Project 1', 'Maciek', './my-house-1.png', [
      new TempSensor(24, 1, 3, 5),
      new TempSensor(25.12, 16, 7, 4),
      new TempSensor(19.03, 5, 5, 53),
      new TempSensor(3.12, 7, 3, 52)
    ], [
      new Light(this.lightKinds[0], 2, 4, 3),
      new Light(this.lightKinds[2], 1, 4, 5)
    ]),
    new House('Project 2', 'Ja', 'http://thumbs.ebaystatic.com/images/g/wl0AAOSwbwlXBlQu/s-l225.jpg', [], []),
    new House('Project 3', 'Mistrz', 'https://www.uktights.com/tightsimages/products/normal/pm_Floral-Suspender-Tights.jpg', [], [])
  ];

  constructor(private http:Http) {
  }

  getLightKinds():String[] {
    return this.lightKinds;
  }

  getHouses():House[] {
    return this.houses;
  }

  getHouse(houseIndex:number):House {
    return this.houses[houseIndex];
  }

  deleteHouse(house:House):void {
    this.houses.splice(this.houses.indexOf(house), 1);
  }

  addHouse(house:House):void {
    this.houses.push(house);
  }

  editHouse(oldHouse:House, newHouse:House):void {
    this.houses[this.houses.indexOf(oldHouse)] = newHouse;
  }

  storeData() {
    const body = JSON.stringify(this.houses);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://smart-house-data.firebaseio.com/houses.json', body, {headers: headers});
  }

  fetchData() {
    return this.http.get('https://smart-house-data.firebaseio.com/houses.json')
      .map((response:Response) => response.json())
      .subscribe(
        (data:House[]) => {
          this.houses = data;
          this.housesChange.emit(this.houses);
        }
      );
  }
}
