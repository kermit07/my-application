import {Injectable, EventEmitter} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {House} from "../shared/house";

@Injectable()
export class ControlPanelService {
  housesChange = new EventEmitter<House[]>();

  private lightKinds:string[] = [
    "#FFFF66",
    "#33FF33",
    "#FF3333",
    "#3333FF"
  ]

  private houses:House[] = [];
  // private houses:House[] = [
  //   new House('Amelia 100', 'Jan Konieczny', './models/my-house-1.png', './threejs/assets/obj/allHouse.dae', [
  //     new TempSensor(24, 1, 3, 5),
  //     new TempSensor(25.12, 16, 7, 4),
  //     new TempSensor(19.03, 5, 5, 53),
  //     new TempSensor(33.12, 7, 3, 52)
  //   ], [
  //     new Light(this.lightKinds[0], 2, 4, 3),
  //     new Light(this.lightKinds[2], 1, 4, 5)
  //   ]),
  //   new House('Zefir', 'Aneta Mazur', './models/x-project2.jpg', 'threejs/assets/obj/projekt2.dae', [], []),
  //   new House('Herbert', 'Piotr Ziemkiewicz', './models/x-project3.jpg', 'threejs/assets/obj/projekt3.dae', [], [])
  // ];

  constructor(private http:Http) {
  }

  getLightKinds() {
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
    this.storeData();
  }

  addHouse(house:House) {
    this.houses.push(house);
    this.storeData();
  }

  editHouse(index:number, newHouse:House) {
    const body = JSON.stringify(newHouse);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://smart-house-data.firebaseio.com/house/' + index + '.json', body, {headers: headers})
      .map((response:Response) => response.json())
      .subscribe(
        data => {
          this.houses[index] = newHouse;
          this.housesChange.emit(this.houses);
          console.log(data);
        },
        error => console.log(error)
      );
  }

  storeData() {
    const body = JSON.stringify(this.houses);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://smart-house-data.firebaseio.com/house.json', body, {headers: headers})
      .map((response:Response) => response.json())
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
  }

  fetchData() {
    return this.http.get('https://smart-house-data.firebaseio.com/house.json')
      .map((response:Response) => response.json())
      .subscribe(
        (data:House[]) => {
          for(let house of data) {
            house = this.fastFix(house);
          }
          this.houses = data;
          this.housesChange.emit(this.houses);
        }
      );
  }

  getFirebaseHouse(index:number) {
    return this.http.get('https://smart-house-data.firebaseio.com/house/' + index + '.json')
      .map((response:Response) => response.json())
      .subscribe(
        (house:House) => {
          this.houses[index] = this.fastFix(house);
          this.housesChange.emit(this.houses);
        }
      );
  }
  private fastFix(house:House):House {
    if(house.tempSensors==undefined)
      house.tempSensors = [];
    if(house.lights==undefined)
      house.lights = [];
    return house;
  }
}
