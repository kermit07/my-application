import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Subscription} from "rxjs/Rx";
import {House} from "../../shared/house";
import {Light} from "../../shared/light";
import {Router, ActivatedRoute} from "@angular/router";
import {ControlPanelService} from "../control-panel.service";
import {DropdownDirective} from "../../dropdown.directive";

@Component({
  moduleId: module.id,
  selector: 'app-light-item',
  templateUrl: 'light-item.component.html',
  styleUrls: ['item.component.css'],
  directives: [DropdownDirective]
})
export class LightItemComponent implements OnInit, OnDestroy {
  private subsribtion:Subscription;
  private selectedHouse:House;
  private lightKinds:String[];
  @Input() light:Light;
  @Input() index:number;

  constructor(private router:Router,
              private route:ActivatedRoute,
              private service:ControlPanelService) {
  }

  ngOnInit() {
    this.lightKinds = this.service.getLightKinds();
    this.subsribtion = this.route.params.subscribe(
      (params:any) => {
        let houseIndex = params['id'];
        this.selectedHouse = this.service.getHouse(houseIndex);
      }
    );
  }

  ngOnDestroy() {
    this.subsribtion.unsubscribe();
  }

  onDelete() {
    this.selectedHouse.lights.splice(this.index, 1);
  }

  mkFixed(input, fixed) {
    input.value = parseFloat(input.value).toFixed(fixed);
  }

  onChangeColor(color:String) {
    this.light.color = color;
  }
}
