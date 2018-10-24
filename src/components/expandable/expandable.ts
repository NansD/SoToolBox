import { Component, Input } from "@angular/core";

@Component({
  selector: "expandable",
  templateUrl: "expandable.html"
})
export class ExpandableComponent {
  @Input() weatherItem: Object;
  @Input() weatherList: any;

  constructor() {
  }

  ngOnInit() {
    this.selectWeatherTitle();
  }

  buildIconUrl(iconName: string): string {
    return `http://openweathermap.org/img/w/${iconName}.png`;
  }

  expand(event) {
    let element = event.srcElement ? event.srcElement : event.target;
    element.classList.toggle("expanded");
    for (let item of element.lastElementChild.children) {
      if (item.tagName != "ION-CARD-HEADER") item.classList.toggle("hidden");
    }
  }

  inRange(x, min, max): boolean {
    return (x - min) * (x - max) <= 0;
  }

  selectWeatherTitle() {
    let self: ExpandableComponent = this;
    let time: number = new Date().getHours() * 60 + new Date().getMinutes();
    var found: Object = this.weatherList.find(function(weather) {
      let weatherTime: number =
        weather.date.getHours() * 60 + weather.date.getMinutes();
      return self.inRange(weatherTime, time - 120, time + 120);
    });
    if (found == undefined) {
      found = this.weatherList.find(function(weather) {
        let weatherTime: number =
          weather.date.getHours() * 60 + weather.date.getMinutes();
        return self.inRange(weatherTime, time - 360, time + 360);
      });
    }
    if (!!found) {
      this.weatherItem = found;
    }
  }
}
