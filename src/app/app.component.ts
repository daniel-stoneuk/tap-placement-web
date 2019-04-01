import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ResponseContentType } from '@angular/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'tap-placement-web';
  zoom: number = 17;
  lat: number = 13.625824;
  lng: number = -15.191299;
  
  sendLat: number = this.lat;
  sendLng: number = this.lng;

  resultPercentage = 50;
  resultHouses = 100;
  resultTaps = 3;
  resultArea = 0;
  resultPopulation = 0;
  resultRecommendation = 0;

  size: number = 1000;
  taps: number = 3;
  grid: number = 20;
  api: string = "http://0.0.0.0";
  zoomlevel: number = 19;

  requesting: boolean = false;
  

  imageData: any;
  originalImageData: any;

  imageSrc: any;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  centerChange($event) {
    this.sendLat = $event.lat;
    this.sendLng = $event.lng;
  }

  mouseDown(): void {
    this.imageSrc = this.originalImageData;
  }

  mouseUp(): void {
    this.imageSrc = this.imageData;
  }

  async request() {
    this.requesting = true;
    // let BASE_API = "http://ts.jones-matthew.uk";
    // let BASE_API = "http://0.0.0.0";
    this.http.get(`${this.api}:25565/giveLocation?long=${this.sendLng}&lat=${this.sendLat}&taps=${this.taps}&size=${this.size}&grid=${this.grid}&zoom=${this.zoomlevel}`).toPromise().then(data => {
      console.log(data);
      this.resultPercentage = data['percentage'];
      this.resultHouses = data['houses'];
      this.resultTaps = data['taps'];
      this.resultArea = data['area'];
      this.resultPopulation = data['population'];
      this.resultRecommendation = data['recommendation'];
      let image = data['image'];
      let originalImage = data['original'];
      console.log(image)

      this.imageData = 'data:image/png;base64,'+ image;
      this.originalImageData = 'data:image/png;base64,'+ originalImage;

      this.imageSrc = this.imageData;

  
      this.requesting = false;
    }).catch((err) => {
      console.log(err);
      this.requesting = false;
    });
  }
}  


