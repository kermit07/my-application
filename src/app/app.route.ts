import {provideRouter} from "@angular/router";
import {ControlPanelComponent} from "./control-panel/control-panel.component";
import {VisualizationComponent} from "./visualization/visualization.component";

export const APP_ROUTES_PROVIDERS = [
  provideRouter([
    { path: '', redirectTo: '/control-panel', pathMatch: 'full'},
    { path: 'control-panel', component: ControlPanelComponent },
    { path: 'visualization', component: VisualizationComponent }
  ])
];
