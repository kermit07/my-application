import {TempSensor} from "./temp-sensor";
export class House {
  constructor(public name, public owner, public imagePath, tempSensors: TempSensor[]) {};
}
