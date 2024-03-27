import { Component, OnInit } from '@angular/core';
import { KomikService } from '../komik.service';
import { ActivatedRoute } from '@angular/router';
import { KomikModel } from '../komik.model';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-bacakomik',
  templateUrl: './bacakomik.component.html',
  styleUrls: ['./bacakomik.component.scss'],
})
export class BacakomikComponent implements OnInit {

  komiks = [];
  ulasan = "";
  nilai = 0;
  idUser = "";
  idKomik = 0;

  constructor(public storage: Storage, public kms: KomikService,
    public route: ActivatedRoute) { }

  bacaKomik() {
    this.idKomik = this.route.snapshot.params['id'];
    this.kms.bacaKomik(this.idKomik).subscribe(
      (data) => {
        if (data['result'] == "success") {
          this.updateView();
          this.komiks = data['data'];
        } else {
          alert(data['message']);
        }
      }
    )
  }
  updateView() {
    this.idKomik = this.route.snapshot.params['id'];
    this.kms.updateView(this.idKomik).subscribe(
      (data) => {
        if (data['result'] != "success") {
          alert("gagal di update view komik");
        }
      }
    )
  }
  addRating(rating: number, ulasan: string) {
    if (this.nilai == 0) {
      alert("Pilih bintang terlebih dahulu!");
    } else {
      this.kms.addRating(this.idUser, this.idKomik, rating, ulasan).subscribe(
        (data) => {
          if (data['result'] == "success") {
            this.komiks = data['data'];
          } else {
            alert("Anda sudah memberikan nilai sebelumnya. Silahkan melihat hasil komentar anda di halaman ini.");
          }
        }
      )
    }
  }
  setStar(nilai: number) {
    this.nilai = nilai;
    for (var i = 1; i <= 5; i++) {
      var id = "star" + i;
      const doc = document.getElementById(id);
      doc?.setAttribute("color", "");
    }
    for (var i = 1; i <= nilai; i++) {
      var id = "star" + i;
      const doc = document.getElementById(id);
      doc?.setAttribute("color", "warning");
    }
  }

  async ngOnInit() {
    this.bacaKomik();
    await this.storage.create();
    this.idUser = await this.storage.get("user_id");
  }

}
