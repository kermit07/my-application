import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {RenderService} from "./render.service";
import {ControlPanelService} from "../control-panel/control-panel.service";

@Component({
  moduleId: module.id,
  selector: 'app-modifier',
  templateUrl: 'modifier.component.html'
})
export class ModifierComponent implements OnInit, OnDestroy{
  private renderService:RenderService;
  @Input() container : HTMLElement;
  @Input() panel : HTMLElement;

  constructor(private service:ControlPanelService) {};

  ngOnInit() {
    this.renderService = new RenderService(this.container, this.panel, this.service);
  }

  ngOnDestroy() {
    this.renderService.onDestroy();
    delete this.renderService;
  }

}
