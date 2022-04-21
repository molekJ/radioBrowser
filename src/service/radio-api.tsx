import { Station as StationInterface } from "../types/interfaces";

export default class RadioApi {
  private _url =
    "https://de1.api.radio-browser.info/json/stations/bycountry/poland";

  /**
   * getPolishStation
   */
  public stations(): Promise<StationInterface[]> {
    return new Promise((res, rej) => {
      fetch(this._url, {})
        .then((data) => {
          data
            .json()
            .then((stations) => res(stations))
            .catch((err) => rej(err));
        })
        .catch((err) => rej(err));
    });
  }
}
