import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {TeamPageComponent} from "./team-page.component";
import {TeamPageRoutingModule} from "./team-page-routing.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    TeamPageComponent
  ],
  imports: [
    CommonModule,
    TeamPageRoutingModule,
    SharedModule
  ],
})
export class TeamPageModule {}
