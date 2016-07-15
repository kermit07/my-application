import {TempSensor} from "./temp-sensor";
export class House {
  constructor(public name: string, public owner: string, public imagePath: string, tempSensors: TempSensor[]) {};
}
