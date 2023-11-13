import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {League} from "../../models/league.interface";
import {SessionStorageService} from "../../services/session-storage/session-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /**
   * Current selected button
   * Default - England
   */
  activeButtonIndex: number = 0;

  /**
   * Current selected league.
   * Default - Premier League
   */
  lastSelectedLeague: number = 39;

  /**
   * Data for the list of buttons in the header
   */
  leagues: League[] = [
   {
     name: 'England',
     buttonId: 'england',
     apiLeagueId: 39
   },
   {
     name: 'Spain',
     buttonId: 'spain',
     apiLeagueId: 140
   },
   {
     name: 'Germany',
     buttonId: 'germany',
     apiLeagueId: 78
   },
   {
     name: 'France',
     buttonId: 'france',
     apiLeagueId: 61
   },
   {
     name: 'Italy',
     buttonId: 'italy',
     apiLeagueId: 135
   }
 ];

  /**
   * Output for sending the selected league
   */
 @Output() newLeagueEvent: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Constructor
   *
   * @param {SessionStorageService} sessionStorageService
   */
 constructor(private readonly sessionStorageService: SessionStorageService) {}

  /**
   * Logic to be used when coming back from a different page
   */
 ngOnInit(): void {
   if (!this.sessionStorageService.getItem('activeButtonIndex')) {
     this.sessionStorageService.setItem('activeButtonIndex', this.activeButtonIndex.toString());
   } else {
     this.activeButtonIndex = this.sessionStorageService.getItem('activeButtonIndex');
   }

   if (!this.sessionStorageService.getItem('lastSelectedLeague')) {
     this.sessionStorageService.setItem('lastSelectedLeague', this.lastSelectedLeague.toString());
   }
 }

  /**
   * Send the selected league
   * @param leagueId
   * @param buttonIndex
   */
  onSelectLeague(leagueId: number, buttonIndex: number): void {
   this.newLeagueEvent.emit(leagueId);
   this.setActiveButton(buttonIndex);
 }

  /**
   * Set the active button by its index
   * @param buttonIndex
   */
 setActiveButton(buttonIndex: number): void {
   this.activeButtonIndex = buttonIndex;
   this.sessionStorageService.setItem('activeButtonIndex', this.activeButtonIndex.toString());
 }
}
