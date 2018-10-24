import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {
  apiKey = "c28fe68add7c58df27936f66d361f1f3"; // TODO: hide this!!!
  url;

  constructor(public http: HttpClient) {
  }

  getWeather(cityName, countryCode) {
    this.buildUrl(cityName, countryCode);
    console.log("get request " + this.url);
    return this.http.get(this.url).map(res => JSON.stringify(res));
  }

  buildUrl(cityName, countryCode, units = "metric") {
    // https://openweathermap.org/forecast5
    // paremeters : city name and country code divided by comma, use ISO 3166 country codes
    this.url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName},${countryCode}&mode=json&APPID=${
      this.apiKey
    }&units=${units}`;
  }
}
