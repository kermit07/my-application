import {Component, Input, OnInit, OnDestroy, EventEmitter} from "@angular/core";
import {RenderService} from "./render.service";
import {ControlPanelService} from "../control-panel/control-panel.service";
import {Router} from "@angular/router";

export class RenderConfig {
  constructor(public night:boolean,
              public transparent:boolean) {
  };
}

@Component({
  moduleId: module.id,
  selector: 'app-modifier',
  templateUrl: 'modifier.component.html'
})
export class ModifierComponent implements OnInit, OnDestroy {
  private renderService:RenderService;
  @Input() container:HTMLElement;
  @Input() panel:HTMLElement;

  constructor(public service:ControlPanelService,
              public router:Router) {
  };

  ngOnInit() {
    this.renderService = new RenderService(this.container, this.panel, this);
  }

  ngOnDestroy() {
    this.renderService.onDestroy();
  }
}
