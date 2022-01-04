import { ders } from './../../models/ders';
import { Odev } from './../../models/odev';
import { kullanici } from './../../models/kullanici';
import { FbNotServisService } from './../../services/fbNotServis.service';
import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/sonuc';
import { map } from 'rxjs/operators';
import { not } from 'src/app/models/not';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  odevler;
  kullanicilar;
  notlar;
  dersler;
  secOdev: Odev = new Odev();
  secDers: ders = new ders();
  secKullanici: kullanici = new kullanici();
  sonuc: Sonuc = new Sonuc();
  secNot: not = new not();
  odevtab: boolean = false;
  kullanicitab: boolean = false;
  derstab: boolean = false;
  notlartab: boolean = false;
  constructor(
    public fbServis: FbServisService,
    public FbNotServis : FbNotServisService
  ) { }

  ngOnInit() {
    this.OdevListele();
    this.KullaniciListele();
    this.DersListele();
    this.NotListele();
  }

  DersKaydet() {
    if (this.secDers.key == null) {
      this.fbServis.DersEkle(this.secDers).then(d=>{
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Ders Başarıyla Eklendi!";
      });
    }else{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu.";
    }
  }
  Kaydet() {
    var tarih = new Date();
    if (this.secOdev.key == null) {
      this.secOdev.kayTarih = tarih.getTime();
      this.secOdev.duzTarih = tarih.getTime();
      this.secOdev.islem = false;
      this.fbServis.OdevEkle(this.secOdev).then(d=>{
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Ödev Başarıyla Eklendi!";
      });
    }else{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu.";
    }
  }


  NotKaydet() {
    var tarih = new Date();
    if (this.secNot.key == null) {
      this.secNot.kayTarih = tarih.getTime();
      this.FbNotServis.NotEkle(this.secNot).then(d=>{
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Not Başarıyla Eklendi!";
      });
    }else{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu.";
    }
  }

  NotDuzenle(){
    var tarih = new Date();
          this.secNot.kayTarih = tarih.getTime();
      this.FbNotServis.NotDuzenle(this.secNot).then(d=>{
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Not Başarıyla Düzenlendi!";
    },err=>{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu.";
    });
  }

  OdevDuzenle(){
    var tarih = new Date();
          this.secOdev.duzTarih = tarih.getTime();
      this.secOdev.islem = false;
      this.fbServis.OdevDuzenle(this.secOdev).then(d=>{
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Görev Başarıyla Düzenlendi!";
    },err=>{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu.";
    });
  }

  OdevSil(){
    this.fbServis.OdevSil(this.secOdev.key).then(d=>{
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Görev Silindi!"
    },err=>{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu!"
    });
  }

  NotSil(){
    this.FbNotServis.NotSil(this.secNot.key).then(d=>{
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Not Silindi!"
    },err=>{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu!"
    });
  }


 KullaniciSil(){
    this.fbServis.KulaniciSil(this.secKullanici.key).then(d=>{
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kullanici Silindi!"
    },err=>{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu!"
    });
  }

  KullaniciDuzenle(){
      this.fbServis.KulaniciDuzenle(this.secKullanici).then(d=>{
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Görev Başarıyla Düzenlendi!";
    },err=>{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu.";
    });
  }

   OdevSec(g: Odev){
    Object.assign(this.secOdev, g);
  }

  KullaniciSec(k: kullanici){
    Object.assign(this.secKullanici, k);
  }

  DersSec(p: ders){
    Object.assign(this.secDers, p);
  }

  NotSec(n: not){
    Object.assign(this.secNot, n);
  }


  OdevListele() {
    this.fbServis.OdevListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.odevler = data;
    });
  }

  KullaniciListele() {
    this.fbServis.KulaniciListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.kullanicilar = data;
    });
  }


  NotListele() {
    this.FbNotServis.NotListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.notlar = data;
    });
  }

  DersListele() {
    this.fbServis.DersListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.dersler = data;
    });
  }

  DersDuzenle(){
    this.fbServis.DersDuzenle(this.secDers).then(d=>{
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Ders Başarıyla Düzenlendi!";
  },err=>{
    this.sonuc.islem = false;
    this.sonuc.mesaj = "Hata Oluştu.";
  });
}

DersSil(){
  this.fbServis.DersSil(this.secDers.key).then(d=>{
    this.sonuc.islem = true;
    this.sonuc.mesaj = "Ders Silindi!"
  },err=>{
    this.sonuc.islem = false;
    this.sonuc.mesaj = "Hata Oluştu!"
  });
}


}
