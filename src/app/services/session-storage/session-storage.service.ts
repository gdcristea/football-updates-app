import {Injectable} from "@angular/core";

/**
 * Service used for interacting with the session storage
 */
@Injectable({
  providedIn: "root"
})
export class SessionStorageService {
  /**
   * Get data from session storage
   * @param key
   */
  getItem(key: string): number {
    return +sessionStorage.getItem(key);
  }

  /**
   * Set data to session storage
   * @param key
   * @param value
   */
  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }
}
