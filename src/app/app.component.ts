import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ControlPanelService} from "./control-panel/control-panel.service";
import {HeaderComponent} from "./header.component";

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  directives: [HeaderComponent, ROUTER_DIRECTIVES],
  providers: [ControlPanelService]
})

export class AppComponent {
}
