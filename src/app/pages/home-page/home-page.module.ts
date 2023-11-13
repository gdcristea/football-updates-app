import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {HomePageComponent} from "./home-page.component";
import {HomePageRoutingModule} from "./home-page-routing.module";
import {StandingsTableComponent} from "../../components/standings-table/standings-table.component";
import {HeaderComponent} from "../../components/header/header.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    HomePageComponent,
    StandingsTableComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    SharedModule
  ],
})
export class HomePageModule {}
