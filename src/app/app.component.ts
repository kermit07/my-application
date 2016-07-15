import { Component } from '@angular/core';
import {HeaderComponent} from "./header.component";
import {HomeProjectsComponent} from "./home-projects";
import {ControlPanelComponent} from "./control-panel/control-panel.component";

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  directives: [HeaderComponent, ControlPanelComponent]
})

export class AppComponent {
}
