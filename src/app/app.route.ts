import {provideRouter} from "@angular/router";
import {ControlPanelComponent} from "./control-panel/control-panel.component";
import {VisualizationComponent} from "./visualization/visualization.component";
import {CONTROL_PANEL_ROUTES} from "./control-panel/control-panel.routes";

export const APP_ROUTES_PROVIDERS = [
  provideRouter([
    {path: '', redirectTo: '/control-panel', pathMatch: 'full'},
    {path: 'control-panel', component: ControlPanelComponent, children: CONTROL_PANEL_ROUTES},
    {path: 'visualization', component: VisualizationComponent}
  ])
];
