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
    new House('Amelia 100', 'Jan Konieczny', './models/my-house-1.png', [
      new TempSensor(24, 1, 3, 5),
      new TempSensor(25.12, 16, 7, 4),
      new TempSensor(19.03, 5, 5, 53),
      new TempSensor(3.12, 7, 3, 52)
    ], [
      new Light(this.lightKinds[0], 2, 4, 3),
      new Light(this.lightKinds[2], 1, 4, 5)
    ]),
    new House('Zefir', 'Aneta Mazur', './models/x-project2.jpg', [], []),
    new House('Herbert', 'Piotr Ziemkiewicz', './models/x-project3.jpg', [], [])
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

  deleteHouse(houseIndex:number):void {
    this.houses.splice(houseIndex, 1);
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
    return this.http.put('https://smart-house-data.firebaseio.com/house.json', body, {headers: headers});
  }

  fetchData() {
    return this.http.get('https://smart-house-data.firebaseio.com/house.json')
      .map((response:Response) => response.json())
      .subscribe(
        (data:House[]) => {
          this.houses = data;
          this.housesChange.emit(this.houses);
        }
      );
  }
}
