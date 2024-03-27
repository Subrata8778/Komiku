import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KomikService {

  daftarKomik(): Observable<any> {
    let body = new HttpParams();
    body = body.set('command', "select_komik");
    return this.http.post("https://ubaya.fun/hybrid/160420002/hmp/uas/daftarkomik.php", body);
  }
  cariKomik(cari: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('command', "cari_komik");
    body = body.set('cari', cari);
    return this.http.post("https://ubaya.fun/hybrid/160420002/hmp/uas/daftarkomik.php", body);
  }
  cariKomikKategori(cari: string, id: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('command', "cari_komik_kategori");
    body = body.set('cari', cari);
    body = body.set('id', id);
    return this.http.post("https://ubaya.fun/hybrid/160420002/hmp/uas/daftarkomik.php", body);
  }
  bacaKomik(id: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('command', "baca_komik");
    body = body.set('idKomik', id);
    return this.http.post("https://ubaya.fun/hybrid/160420002/hmp/uas/daftarkomik.php", body);
  }
  getFavourites(id: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('idUser', id);
    return this.http.post("https://ubaya.fun/hybrid/160420002/hmp/uas/getfavorite.php", body);
  }
  addFavourite(idUser: string, idKomik: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('idUser', idUser);
    body = body.set('idKomik', idKomik);
    return this.http.post("https://ubaya.fun/hybrid/160420002/hmp/uas/addfavorite.php", body);
  }
  addRating(idUser: string, idKomik: number, rating: number, ulasan: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('idUser', idUser);
    body = body.set('idKomik', idKomik);
    body = body.set('nilai', rating);
    body = body.set('ulasan', ulasan);
    return this.http.post("https://ubaya.fun/hybrid/160420002/hmp/uas/addrating.php", body);
  }
  getRating(id: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('komik', id);
    body = body.set('command', "hitung_rating");
    return this.http.post("https://ubaya.fun/hybrid/160420002/hmp/uas/getrating.php", body);
  }
  getCommentRating(id: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('komik', id);
    body = body.set('command', "ambil_rating_ulasan");
    return this.http.post("https://ubaya.fun/hybrid/160420002/hmp/uas/getrating.php", body);
  }
  updateView(id: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('command', "update_view");
    body = body.set('idKomik', id);
    return this.http.post("https://ubaya.fun/hybrid/160420002/hmp/uas/daftarkomik.php", body);
  }
  constructor(private http: HttpClient) { }
}
