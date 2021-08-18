import { Component } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cache-busting';
  // md5 = JSON.stringify(new Md5());
  // newMd5 = JSON.stringify(new Md5());
  address:any;
  initialLoad:any;
  hash:any;

  ngOnInit(){
    // console.log(this.md5);
    // console.log(this.md5 == this.newMd5);
    if (
      window.localStorage.getItem("userMd5") &&
      window.localStorage.getItem("initialLoad") &&
      window.localStorage.getItem("address")
    ) {
      this.hash = window.localStorage.getItem("userMd5");
      this.initialLoad = window.localStorage.getItem("initialLoad");
      this.address = window.localStorage.getItem("address");
    } else {
       this.getIPaddress();
    }
  }

  saveToCache(key:string, value:string) {
      window.localStorage.setItem(key, value)

    }

  generateMd5Hash() {
      this.hash = Md5.hashStr(this.address + this.initialLoad)
    }

async getIPaddress() {
      let res = await fetch(
        "https://ipgeolocation.abstractapi.com/v1/?api_key=d2f8e8c7a2ce44eda9a41e78d842126c"
      ).then((s) => s.json());
      console.log(res);
      this.address = res.ip_address;
      this.initialLoad = new Date().toISOString()
      this.generateMd5Hash()
      this.saveToCache('userMd5', this.hash)
      this.saveToCache('initialLoad', this.initialLoad)
      this.saveToCache('address', this.address)
    }
}
