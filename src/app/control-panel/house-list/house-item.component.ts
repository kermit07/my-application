import {Component, OnInit, Input} from '@angular/core';
import {HomeProject} from "../../shared/home-project";

@Component({
  moduleId: module.id,
  selector: 'app-house-item',
  templateUrl: 'house-item.component.html'
})
export class HouseItemComponent implements OnInit {
  @Input() project: HomeProject;
  projectId: number;

  constructor() {}

  ngOnInit() {
  }

}
