import {TempSensor} from "../shared/temp-sensor";
export class TempRgb {
  constructor(public value:number, public color:string) {
  };
}

export class RenderUtils {
  private tempToRgb:TempRgb[] = [];

  constructor() {
    this.initTempRgb();
  }

  public calcRgbColor(celsius) {
    for (var i = 0; i < this.tempToRgb.length; i++) {
      if (this.tempToRgb[i].value < celsius)
        return this.tempToRgb[i].color;
    }
    return "#ffffff";
  }

  public toKelvin(celsius) {
    return celsius + 273.15;
  }

  public distanceVector3(v1, v2) {
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  public distanceVector2(v1, v2) {
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  public distancePoints(p1, p2) {
    return Math.abs(p2 - p1);
  }

  private initTempRgb() {
    this.tempToRgb.push(new TempRgb(44, "#ff3300"));
    this.tempToRgb.push(new TempRgb(43, "#ff3800"));
    this.tempToRgb.push(new TempRgb(42, "#ff4500"));
    this.tempToRgb.push(new TempRgb(41, "#ff4700"));
    this.tempToRgb.push(new TempRgb(40, "#ff5200"));
    this.tempToRgb.push(new TempRgb(39, "#ff5300"));
    this.tempToRgb.push(new TempRgb(38, "#ff5d00"));
    this.tempToRgb.push(new TempRgb(37, "#ff5d00"));
    this.tempToRgb.push(new TempRgb(36, "#ff6600"));
    this.tempToRgb.push(new TempRgb(35, "#ff6500"));
    this.tempToRgb.push(new TempRgb(34, "#ff6f00"));
    this.tempToRgb.push(new TempRgb(33, "#ff6d00"));
    this.tempToRgb.push(new TempRgb(32, "#ff7600"));
    this.tempToRgb.push(new TempRgb(31, "#ff7300"));
    this.tempToRgb.push(new TempRgb(30, "#ff7c00"));
    this.tempToRgb.push(new TempRgb(29, "#ff7900"));
    this.tempToRgb.push(new TempRgb(28, "#ff8200"));
    this.tempToRgb.push(new TempRgb(27, "#ff7e00"));
    this.tempToRgb.push(new TempRgb(26, "#ff8700"));
    this.tempToRgb.push(new TempRgb(25, "#ff8300"));
    this.tempToRgb.push(new TempRgb(24, "#ff8d0b"));
    this.tempToRgb.push(new TempRgb(23, "#ff9d33"));
    this.tempToRgb.push(new TempRgb(22, "#ffaa4d"));
    this.tempToRgb.push(new TempRgb(21, "#ffb662"));
    this.tempToRgb.push(new TempRgb(20, "#ffc076"));
    this.tempToRgb.push(new TempRgb(19, "#ffc987"));
    this.tempToRgb.push(new TempRgb(18, "#ffd097"));
    this.tempToRgb.push(new TempRgb(17, "#ffd7a6"));
    this.tempToRgb.push(new TempRgb(16, "#ffddb4"));
    this.tempToRgb.push(new TempRgb(15, "#ffe2c0"));
    this.tempToRgb.push(new TempRgb(14, "#ffe7cc"));
    this.tempToRgb.push(new TempRgb(13, "#ffe8d0"));
    this.tempToRgb.push(new TempRgb(12, "#ffe8d5"));
    this.tempToRgb.push(new TempRgb(11, "#ffedda"));
    this.tempToRgb.push(new TempRgb(10, "#ffece0"));
    this.tempToRgb.push(new TempRgb(9, "#fff0e4"));
    this.tempToRgb.push(new TempRgb(8, "#fff0e9"));
    this.tempToRgb.push(new TempRgb(7, "#fff4ed"));
    this.tempToRgb.push(new TempRgb(6, "#fff4f2"));
    this.tempToRgb.push(new TempRgb(5, "#fff7f5"));
    this.tempToRgb.push(new TempRgb(4, "#fff8fb"));
    this.tempToRgb.push(new TempRgb(3, "#fff9fd"));
    this.tempToRgb.push(new TempRgb(2, "#fcf7ff"));
    this.tempToRgb.push(new TempRgb(1, "#faf7ff"));
    this.tempToRgb.push(new TempRgb(0, "#f7f5ff"));
    this.tempToRgb.push(new TempRgb(-1, "#e9ecff"));
    this.tempToRgb.push(new TempRgb(-2, "#dde4ff"));
    this.tempToRgb.push(new TempRgb(-3, "#d5deff"));
    this.tempToRgb.push(new TempRgb(-4, "#ced9ff"));
    this.tempToRgb.push(new TempRgb(-5, "#c8d5ff"));
    this.tempToRgb.push(new TempRgb(-6, "#c4d2ff"));
    this.tempToRgb.push(new TempRgb(-7, "#c0cfff"));
    this.tempToRgb.push(new TempRgb(-8, "#bccdff"));
    this.tempToRgb.push(new TempRgb(-9, "#bacbff"));
    this.tempToRgb.push(new TempRgb(-10, "#b7c9ff"));
  }

  public getSensorssssArray():TempSensor[] {
    let result:TempSensor[] = [];
    result.push(new TempSensor(23.7, 6.3, 2.5, -1.3));
    result.push(new TempSensor(22.2, -0.5, 2.5, -2.5));
    result.push(new TempSensor(25.3, -0.5, 2.5, -8.3));
    return result;
  }
}
