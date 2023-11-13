import {Component} from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  /**
   * Current selected league.
   */
  currentLeagueId: number;

  /**
   * Get current league from header component when user clicks on one of the buttons
   * @param leagueId
   */
  getCurrentLeagueId(leagueId: number): void {
    this.currentLeagueId = leagueId;
  }
}
