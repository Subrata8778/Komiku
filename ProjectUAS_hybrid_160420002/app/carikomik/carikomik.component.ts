import { Component, OnInit } from '@angular/core';
import { KomikService } from '../komik.service';
import { KomikModel } from '../komik.model';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-carikomik',
  templateUrl: './carikomik.component.html',
  styleUrls: ['./carikomik.component.scss'],
})
export class CarikomikComponent implements OnInit {

  komiks: KomikModel[] = [];
  favourites: KomikModel[] = [];
  cari = "";
  idUser = "";

  constructor(public storage: Storage, public kms: KomikService) { }

  daftarKomik() {
    this.kms.daftarKomik().subscribe(
      (data) => {
        if (data['result'] == "success") {
          this.komiks = data['data'];
        } else {
          alert("Belum ada komik terdaftar");
        }
      }
    );
  }
  cariKomik(cari: string) {
    this.kms.cariKomik(cari).subscribe(
      (data) => {
        if (data['result'] == "success") {
          this.komiks = data['data'];
        } else {
          alert("Hasil pencarian tidak ditemukan");
        }
        this.setLoveById(this.idUser);
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
    this.daftarKomik();
    this.setLoveById(this.idUser);
  }

}
