import { Component, OnInit } from '@angular/core';
import { KategoriService } from '../kategori.service';
import { KategoriModel } from '../kategori.model';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.scss'],
})
export class KategoriComponent implements OnInit {

  kategories: KategoriModel[] = [];

  constructor(public ks: KategoriService) { }

  listKomikKategori() {
    this.ks.listKategori().subscribe(
      (data) => {
        if (data['result'] == "success") {
          this.kategories = data['data'];
        }else{
          alert(data['message']);
        }
      }
    );
  }

  ngOnInit() {
    this.listKomikKategori();
  }

}
