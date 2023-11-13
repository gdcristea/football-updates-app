import {Component, OnDestroy, OnInit} from '@angular/core';
import {Fixture, TeamFixture} from "../../models/fixture.interface";

import {ActivatedRoute, Router} from "@angular/router";
import {RoutingPathsService} from "../../services/routing-paths/routing-paths.service";
import {ApiService} from "../../services/api/api.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit, OnDestroy {
  /**
   * Show/Hide loader
   */
  isLoading: boolean = false;
  /**
   * Last 10 fixtures of the selected team
   */
  fixtures: TeamFixture[];

  /**
   * Team id
   */
  teamId: number;

  /**
   * Store subscription
   */
  subscription: Subscription;

  /**
   * Constructor
   *
   * @param {ApiService} apiService
   * @param {ActivatedRoute} activatedRoute
   * @param {Router} router
   */
  constructor(
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  /**
   * Get data concerning a team's last 10 fixtures
   */
  ngOnInit(): void {
    this.teamId =  +this.activatedRoute.snapshot.params['teamId'];
    this.isLoading = true;
    this.subscription = this.apiService.getLast10FixturesByTeam(this.teamId)
      .subscribe((fixturesData: Fixture): void => {
        this.fixtures = fixturesData.response;
        this.isLoading = false;
      },
        (): void => {
          this.isLoading = true;
        })
  }

  /**
   * Unsubscribe from the subscription
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Navigate to the league info screen
   */
  goBack(): void {
    this.router.navigate([RoutingPathsService.paths.leagueInformation]);
  }

}
