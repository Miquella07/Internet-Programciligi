import { ders } from './../models/ders';
import { kullanici } from './../models/kullanici';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Odev } from './../models/odev';


@Injectable({
  providedIn: 'root'
})
export class FbServisService {

  private dbKayit = '/Odevler';
  private dbKullanici = '/Kullanicilar';
  private dbDers = '/Dersler';

  odevRef: AngularFireList<Odev> = null;
  kullaniciRef: AngularFireList<kullanici> = null;
  dersRef: AngularFireList<ders> = null;
  

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.odevRef = db.list(this.dbKayit);
    this.kullaniciRef = db.list(this.dbKullanici);
    this.dersRef = db.list(this.dbDers);
  }

  OturumKontrol() {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      return false;
    }
  }

  UyeOl(kullanici: kullanici) {
    return this.afAuth.createUserWithEmailAndPassword(kullanici.mail, kullanici.parola)
  }
  UyeEkle(kullanici: kullanici) {
    return this.kullaniciRef.push(kullanici);
  }
  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }

  OturumKapat() {
    return this.afAuth.signOut();
  }

  /* Ödev Servisleri Başlangıç */
  OdevEkle(g: Odev) {
    return this.odevRef.push(g);
  }
  OdevListele() {
    return this.odevRef
  }
  OdevSil(key: string) {
    return this.odevRef.remove(key);
  }
  OdevDuzenle(g: Odev) {
    return this.odevRef.update(g.key, g);
  }
  /* Ödev Servisleri Bitiş */

  /* Ders Servisleri Başlangıç */
  DersEkle(p: ders) {
    return this.dersRef.push(p);
  }
  DersListele() {
    return this.dersRef
  }
  DersSil(key: string) {
    return this.dersRef.remove(key);
  }
  DersDuzenle(p: ders) {
    return this.dersRef.update(p.key, p);
  }
  /* Ders Servisleri Bitiş */

  /* Kullanıcı Servisleri Başlangıç */
  KulaniciListele() {
    return this.kullaniciRef
  }
  KulaniciSil(key: string) {
    return this.kullaniciRef.remove(key);
  }
  KulaniciDuzenle(k: kullanici) {
    return this.kullaniciRef.update(k.key, k);
  }
  /* Kullanıcı Servisleri Bitiş */

}