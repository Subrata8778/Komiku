import { Component, OnInit } from '@angular/core';
import { KomikModel } from '../komik.model';
import { KomikService } from '../komik.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-komikkategori',
  templateUrl: './komikkategori.component.html',
  styleUrls: ['./komikkategori.component.scss'],
})
export class KomikkategoriComponent implements OnInit {

  komiks: KomikModel[] = [];
  cari = "";
  favourites: KomikModel[] = [];
  idUser = "";

  constructor(public kms: KomikService, public route: ActivatedRoute, public storage: Storage) { }

  cariKomikKategori(cari: string) {
    var id: number = this.route.snapshot.params['id'];
    this.kms.cariKomikKategori(cari, id).subscribe(
      (data) => {
        if (data['result'] == "success") {
          this.komiks = data['data'];
        } else {
          alert("Hasil pencarian tidak ditemukan");
        }
      }
    );
  }
  setLoveById(idUser: string) {
    alert("berhasil");
    this.kms.getFavourites(idUser).subscribe(
      (data) => {
        if (data['result'] == "success") {
          this.favourites = data['data'];
          for (var idKomik = 0; idKomik < this.komiks.length; idKomik++) {
            this.getRating(this.komiks[idKomik].id, idKomik);
            for (var i = 0; i < this.favourites.length; i++) {
              if (this.favourites[i]['id'] == this.komiks[idKomik].id) {
                var id = "favourites" + this.favourites[i]['id'];
                const doc = document.getElementById(id);
                doc?.setAttribute("color", "danger");
              }
            }
          }
        }
      }
    );
  }
  addFavourite(idKomik: number) {
    this.kms.addFavourite(this.idUser, idKomik).subscribe(
      (data) => {
        if (data['result'] == "success") {
          var id = "favourites" + idKomik;
          const doc = document.getElementById(id);
          doc?.setAttribute("color", "danger");
        } else {
          var id = "favourites" + idKomik;
          const doc = document.getElementById(id);
          doc?.setAttribute("color", "");
        }
      }
    )
  }
  getRating(idKomik: number, index: number) {
    this.kms.getRating(idKomik).subscribe(
      (data) => {
        if (data['result'] != "error") {
          if (data['data'][0]['count'] != 0) {
            this.komiks[index].rating = data['data'][0]['sum'] / data['data'][0]['count'];
          } else {
            this.komiks[index].rating = 0;
          }
        } else {
          alert("Error di get rating");
        }
      }
    )
  }

  async ngOnInit() {
    await this.storage.create();
    this.idUser = await this.storage.get("user_id"); 
    this.cariKomikKategori("");
    this.setLoveById(this.idUser);
  }

}
