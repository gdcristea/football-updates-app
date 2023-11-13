import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Standings} from "../../models/standings.interface";
import {ApiPath} from "./api-paths.enum";
import {Observable, of, tap} from "rxjs";
import {Fixture} from "../../models/fixture.interface";

/**
 * Service used for interrogating the BE which is API football and for caching the data
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * Current year
   */
  currentYear: number = new Date().getFullYear();

  /**
   * Object that stores the API league info response along with its expiry time
   */
  cacheLeague = new Map<string, {data: Standings, expiry: number}>();

  /**
   * Object that stores the API fixture info response along with its expiry time
   */
  cacheFixture = new Map<string, {data: Fixture, expiry: number}>();

  /**
   * The duration for which the cache is considered valid
   * 5 minutes
   */
  cacheDuration: number = 300000;

  /**
   * Constructor
   *
   * @param {HttpClient} http
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Utility function used in all requests to set the required headers
   *
   */
  private setHeaders(): HttpHeaders {
    const headers: {[key: string]: string} = {
      'x-rapidapi-key': 'd7cd94bb152f609214493ea61f201530'
    }

    return new HttpHeaders(headers);
  }

  /**
   * Fetch league data from the cache if it exists.
   * @param key - used to look up data in the cache.
   */
  private getLeagueFromCache(key: string): Observable<Standings> | null {
    const cached: {data: Standings, expiry: number} = this.cacheLeague.get(key);
    const now: number = new Date().getTime();

    if (cached && cached.expiry > now) {
      return of(cached.data);
    }

    return null;
  }

  /**
   * Fetch fixture data from the cache if it exists.
   * @param key - used to look up data in the cache.
   */
  private getFixtureFromCache(key: string): Observable<Fixture> | null {
    const cached: {data: Fixture, expiry: number} = this.cacheFixture.get(key);
    const now: number = new Date().getTime();

    if (cached && cached.expiry > now) {
      return of(cached.data);
    }

    return null;
  }

  /**
   * Update the cache with new league data
   * @param key
   * @param data
   */
  private updateLeagueCache(key: string, data: Standings): void {
    const now: number = new Date().getTime();
    this.cacheLeague.set(key, {data, expiry: now + this.cacheDuration});
  }

  /**
   * Update the cache with new fixture data
   * @param key
   * @param data
   */
  private updateFixtureCache(key: string, data: Fixture): void {
    const now: number = new Date().getTime();
    this.cacheFixture.set(key, {data, expiry: now + this.cacheDuration});
  }

  /**
   * Get league info, either from the cache or from the API.
   *
   * @param leagueId
   */
  getLeagueInformation(leagueId: number): Observable<Standings> {
    const cacheKey: string = `leagueInfo-${leagueId}`;
    const cacheData: Observable<Standings> = this.getLeagueFromCache(cacheKey);

    if(cacheData) {
      return cacheData;
    }

    return this.http.get<Standings>(
  `${ApiPath.leagueInformation}`,
{
          headers: this.setHeaders(),
          params: {
            'league': leagueId,
            'season': this.currentYear
        }
      }
    ).pipe(
      tap((data: Standings) => this.updateLeagueCache(cacheKey, data))
    );
  };

  /**
   * Get info regarding the last 10 games of a team, either from the cache or from the API.
   *
   * @param teamId
   */
  getLast10FixturesByTeam(teamId: number): Observable<Fixture> {
    const cacheKey: string = `teamFixtures-${teamId}`;
    const cacheData: Observable<Fixture> = this.getFixtureFromCache(cacheKey);

    if(cacheData) {
      return cacheData;
    }

    return this.http.get<Fixture>(
  `${ApiPath.teamInformation}`,
      {
        headers: this.setHeaders(),
        params: {
          'team': teamId,
          'last': 10
        }
      }
    ).pipe(
      tap((data: Fixture) => this.updateFixtureCache(cacheKey, data))
    );
  }
}





