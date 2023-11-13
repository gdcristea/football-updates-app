import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoutingPathsService} from "./services/routing-paths/routing-paths.service";

const routes: Routes = [
  /**
   * Redirect empty path to league information page
   */
  {
    path: '',
    redirectTo: RoutingPathsService.paths.leagueInformation,
    pathMatch: 'full'
  },
  /**
   * League information page
   */
  {
    path: RoutingPathsService.paths.leagueInformation,
    loadChildren: () =>
      import('./pages/home-page/home-page.module').then((module) => module.HomePageModule)
  },
  /**
   * Team results page
   */
  {
    path: `${RoutingPathsService.paths.teamResults}/:teamId`,
    loadChildren: () =>
      import('./pages/team-page/team-page.module').then((module) => module.TeamPageModule)
  },
  /**
   * Wildcard route for any other route than the ones defined above
   */
  {
    path: '**',
    redirectTo: RoutingPathsService.paths.leagueInformation
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
