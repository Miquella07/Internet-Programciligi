import { FbServisService } from './../../services/fbServis.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
adsoyad:string;
uid:string;
  constructor(
    public fbServis: FbServisService,
    public router: Router
  ) { }

  ngOnInit() {
    var user=JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad=user.displayName;
  }

  OturumKapat(){
    this.fbServis.OturumKapat().then(()=>{
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });
  }
  
}
