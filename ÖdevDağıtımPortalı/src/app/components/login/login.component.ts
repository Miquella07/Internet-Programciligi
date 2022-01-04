import { Sonuc } from './../../models/sonuc';
import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
sonuc: Sonuc = new Sonuc();
  constructor(
    public fbServis: FbServisService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  GirisYap(mail: string, parola: string) {
this.fbServis.OturumAc(mail,parola).then(d=>{
if (d.user){
  localStorage.setItem("user",JSON.stringify(d.user));
  this.router.navigate(['/']);
  this.sonuc.islem = true;
  this.sonuc.mesaj = "Giriş Başarılı!";
}
},err=>{
  this.sonuc.islem = false;
  this.sonuc.mesaj = "E-Mail ya da Parola Geçersiz!";
});
  }

OturumKapat(){
  this.fbServis.OturumKapat().then(()=>{
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  });
}

}
