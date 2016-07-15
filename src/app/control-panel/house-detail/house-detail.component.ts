import {Component, OnInit, Input} from '@angular/core';
import {HomeProject} from "../../shared/home-project";

@Component({
  moduleId: module.id,
  selector: 'app-house-detail',
  templateUrl: 'house-detail.component.html'
})
export class HouseDetailComponent implements OnInit {
  @Input() selectedProject: HomeProject;

  constructor() {}

  ngOnInit() {
  }

}
