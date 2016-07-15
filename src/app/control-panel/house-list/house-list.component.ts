import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HouseItemComponent} from "./house-item.component";
import {HomeProject} from "../../shared/home-project";

@Component({
  moduleId: module.id,
  selector: 'app-house-list',
  templateUrl: 'house-list.component.html',
  directives: [HouseItemComponent]
})
export class HouseListComponent implements OnInit {
  homeProjects:HomeProject[] = [];
  @Output() projectSelected = new EventEmitter<HomeProject>()
  homeProject = new HomeProject('Project 1', 'Maciek', 'https://www.uktights.com/tightsimages/products/normal/gi_OTK-Double-Stripe-Tights.jpg');

  constructor() {}

  ngOnInit() {
  }

  onSelected(homeProject: HomeProject) {
    this.projectSelected.emit(homeProject);
  }

}
