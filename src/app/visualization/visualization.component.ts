import {Component} from '@angular/core';
import {ModifierComponent} from "./modifier.component";

@Component({
  moduleId: module.id,
  selector: 'app-visualization',
  templateUrl: 'visualization.component.html',
  styleUrls: ['visualization.component.css'],
  directives: [ModifierComponent]
})
export class VisualizationComponent {

  constructor() {
  }
}
