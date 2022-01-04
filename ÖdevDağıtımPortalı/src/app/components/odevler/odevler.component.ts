import { not } from '../../models/not';
import { Sonuc } from './../../models/sonuc';
import { Odev } from './../../models/odev';
import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FbNotServisService } from 'src/app/services/fbNotServis.service';

@Component({
  selector: 'app-gorevler',
  templateUrl: './odevler.component.html',
  styleUrls: ['./odevler.component.scss']
})
export class OdevlerComponent implements OnInit {
  odevler;
  secOdev: Odev = new Odev();
  sonuc: Sonuc = new Sonuc();
  detaylar: boolean;
  secNot: not = new not();
  notlar;
  notekle:boolean=false;
  notdetay: boolean;
  constructor(
    public fbServis: FbServisService,
    public fbNotServis: FbNotServisService
  ) { }

  ngOnInit() {
    this.OdevListele();
    this.NotListele();
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

  NotListele() {
    this.fbNotServis.NotListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.notlar = data;
    });
  }

  OdevSec(g: Odev){
    Object.assign(this.secOdev, g);
  }
  Tamamla(g: Odev, islem:boolean){
    var tarih = new Date();
    g.islem = islem;
    this.secOdev.duzTarih = tarih.getTime();
    this.fbServis.OdevDuzenle(g).then(d=>{
      this.sonuc.islem = true;
      this.sonuc.mesaj = "İşlem Onaylandı!"
    });
  }
  NotSec(n: not){
    Object.assign(this.secNot, n);
  }

  NotKaydet() {
    var tarih = new Date();
    if (this.secNot.key == null) {
      this.secNot.kayTarih = tarih.getTime();
      this.fbNotServis.NotEkle(this.secNot).then(d=>{
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Not Başarıyla Eklendi!";
      });
    }else{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu.";
    }
  }
}
