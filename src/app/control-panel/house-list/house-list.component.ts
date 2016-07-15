import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HouseItemComponent} from "./house-item.component";
import {House} from "../../shared/house";
import {ControlPanelService} from "../control-panel.service";

@Component({
  moduleId: module.id,
  selector: 'app-house-list',
  templateUrl: 'house-list.component.html',
  directives: [HouseItemComponent]
})
export class HouseListComponent implements OnInit {
  houses:House[] = [];
  @Output() selectedHouse = new EventEmitter<House>()

  constructor(private controlPanelService: ControlPanelService) {
  }

  ngOnInit() {
    this.houses = this.controlPanelService.getHouses();
  }

  onSelected(house:House) {
    this.selectedHouse.emit(house);
  }

}
