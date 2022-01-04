import { not } from './../models/not';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FbNotServisService {
  private dbNot = '/Notlar';
  notRef: AngularFireList<not> = null;
  constructor(
    public db: AngularFireDatabase
  ) {
    this.notRef = db.list(this.dbNot);
  }


  /* Not Servisleri Başlangıç */
  NotEkle(n: not) {
    return this.notRef.push(n);
  }
  NotListele() {
    return this.notRef
  }
  NotSil(key: string) {
    return this.notRef.remove(key);
  }
  NotDuzenle(n: not) {
    return this.notRef.update(n.key, n);
  }
  /* Not Servisleri Bitiş */

}
