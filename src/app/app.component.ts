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

  size: number = 200;
  taps: number = 3;

  requesting: boolean = false;
  
  imageData: any;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  centerChange($event) {
    this.sendLat = $event.lat;
    this.sendLng = $event.lng;
  }

  async request() {
    this.requesting = true;

    this.http.get(`http://ts.jones-matthew.uk:25565/giveLocation?long=${this.sendLng}&lat=${this.sendLat}&taps=${this.taps}&size=${this.size}`).toPromise().then(data => {
      console.log(data);
      let image = data['image'];
      console.log(image)

      this.imageData = 'data:image/png;base64,'+ image;

      this.requesting = false;
    }).catch((err) => {
      console.log(err);
      this.requesting = false;
    });
  }
}  


