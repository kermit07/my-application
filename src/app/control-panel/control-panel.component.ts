import { Component, OnInit } from '@angular/core';
import {HouseListComponent} from "./house-list";
import {HouseDetailComponent} from "./house-detail/house-detail.component";
import {HomeProject} from "../shared/home-project";

@Component({
  moduleId: module.id,
  selector: 'app-control-panel',
  templateUrl: 'control-panel.component.html',
  directives: [HouseListComponent, HouseDetailComponent]
})
export class ControlPanelComponent implements OnInit {
  selectedProject: HomeProject;

  constructor() {}

  ngOnInit() {
  }

}
