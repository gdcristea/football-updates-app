import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Standings, Team} from "../../models/standings.interface";
import {Router} from "@angular/router";
import {RoutingPathsService} from "../../services/routing-paths/routing-paths.service";
import {ApiService} from "../../services/api/api.service";
import {SessionStorageService} from "../../services/session-storage/session-storage.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-standings-table',
  templateUrl: './standings-table.component.html',
  styleUrls: ['./standings-table.component.scss']
})
export class StandingsTableComponent implements OnChanges, OnDestroy {
  /**
   * Current selected league
   * Default - Premier League
   */
  @Input() currentLeagueId: number;

  /**
   * Standings of the selected league
   */
  standings: Team[] = [];

  /**
   * Show/Hide loader
   */
  isLoading: boolean = false;

  /**
   * Store subscriptions
   */
  subscriptions: Subscription = new Subscription();

  /**
   * Constructor
   *
   * @param {ApiService} apiService
   * @param {Router} router
   * @param {SessionStorageService} sessionStorageService
   */
  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
    private readonly sessionStorageService: SessionStorageService
  ) {}


  /**
   * Get league data based on league id.
   *
   * When I come back from another page then use the last league id which is stored in session storage.
   * Else, use the value based on the button the user clicked
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
   if (changes['currentLeagueId'].firstChange) {
     const lastSelectedLeagueId: number = this.sessionStorageService.getItem('lastSelectedLeague');
     this.isLoading = true;
     const subscription1: Subscription = this.apiService.getLeagueInformation(lastSelectedLeagueId)
       .subscribe((leagueData: Standings): void => {
           this.standings = leagueData.response[0].league.standings[0];
           this.isLoading = false;
         },
         (): void => {
           this.isLoading = true;
         }
       )
     this.subscriptions.add(subscription1);
   } else {
     const currentValue: number = changes['currentLeagueId'].currentValue;
     this.sessionStorageService.setItem('lastSelectedLeague', currentValue.toString());
     this.isLoading = true;
     const subscription2: Subscription = this.apiService.getLeagueInformation(currentValue)
       .subscribe((leagueData: Standings): void => {
           this.standings = leagueData.response[0].league.standings[0];
           this.isLoading = false;
         },
         (): void => {
           this.isLoading = true;
         }
       )
     this.subscriptions.add(subscription2);
   }
  }

  /**
   * Unsubscribe from all subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Navigate to the fixture screen based on the id of a team
   * @param teamId
   */
  navigateToFixture(teamId: number): void {
    this.router.navigate([`${RoutingPathsService.paths.teamResults}/${teamId}`]);
  }
}
