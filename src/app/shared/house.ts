import {TempSensor} from "./temp-sensor";
import {Light} from "./light";

export class House {
  constructor(public name:string = "",
              public owner:string = "",
              public imagePath:string = "",
              public modelPath:string = "",
              public tempSensors:TempSensor[] = [],
              public lights:Light[] = []) {
  };
}
