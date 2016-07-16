import {RouterConfig} from "@angular/router";
import {ControlPanelStartComponent} from "./control-panel-start.component";
import {HouseDetailComponent} from "./house-detail/house-detail.component";
import {HouseEditComponent} from "./house-edit/house-edit.component";

export const CONTROL_PANEL_ROUTES:RouterConfig = [
  {path: '', component: ControlPanelStartComponent},
  {path: 'new', component: HouseEditComponent},
  {path: ':id', component: HouseDetailComponent},
  {path: ':id/edit', component: HouseEditComponent}
];
