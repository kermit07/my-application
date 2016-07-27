import {Component, Input, OnInit} from '@angular/core';
import {RenderService} from "./render.service";

@Component({
  moduleId: module.id,
  selector: 'app-modifier',
  templateUrl: 'modifier.component.html'
})
export class ModifierComponent implements OnInit{
  private renderService:RenderService;
  @Input() container : HTMLElement;
  @Input() panel : HTMLElement;

  ngOnInit() {
    this.renderService = new RenderService(this.container, this.panel);
    this.renderService.init();
  }

}
