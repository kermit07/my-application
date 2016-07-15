import { Component } from '@angular/core';
import {HeaderComponent} from "./header.component";
import {HomeProjectsComponent} from "./home-projects";

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  directives: [HeaderComponent]
})

export class AppComponent {
}
