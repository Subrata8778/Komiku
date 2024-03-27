import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KategoriService {

  listKategori(): Observable<any> {
    return this.http.get("https://ubaya.fun/hybrid/160420002/hmp/uas/kategori_komik.php");
  }
  constructor(private http: HttpClient) { }
}
