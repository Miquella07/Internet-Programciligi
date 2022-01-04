import { ders } from '../../models/ders';
import { Odev } from './../../models/odev';
import { kullanici } from './../../models/kullanici';
import { Sonuc } from './../../models/sonuc';
import { Router } from '@angular/router';
import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  sonuc: Sonuc = new Sonuc();
  pozisyon: ders = new ders();
  pozisyonlar;
  secKullanici: kullanici = new kullanici();
  constructor(
    public fbServis: FbServisService,
    public Router: Router
  ) { }

  ngOnInit() {
    this.PozisyonListele();
  }

  PozisyonListele() {
    this.fbServis.OdevListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.pozisyonlar = data;
    });
  }
   KayitOl() {
     this.fbServis.UyeOl(this.secKullanici).then(d => {
       d.user.updateProfile({
         displayName: this.secKullanici.adsoyad
       }).then();
       this.secKullanici.uid = d.user.uid;
       localStorage.setItem("user",JSON.stringify(d.user));
       this.KullaniciEkle();
       this.sonuc.islem=false;
       this.sonuc.mesaj="Kayıt Başarılı. Giriş Yapabilirsiniz!";
     }, err => {
       this.sonuc.islem=false;
       this.sonuc.mesaj="Hata Oluştu, Tekrar Deneyiniz!";
     });
   }
KullaniciEkle(){
  this.fbServis.UyeEkle(this.secKullanici).then(d=>{
    this.Router.navigate(['']);
  })
}

}
