import { Component, OnInit } from '@angular/core';
import { KomikService } from '../komik.service';
import { KomikModel } from '../komik.model';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  komiks: KomikModel[] = [];
  idUser = "";

  constructor(public storage: Storage, public kms: KomikService, public route: ActivatedRoute) { }

  getCommentRating(idKomik: number) {
    this.kms.getCommentRating(idKomik).subscribe(
      (data) => {
        if (data['result'] != "error") {
          this.komiks = data['data'];
        } else {
          alert("Error di get comment");
        }
      }
    )
  }

  ngOnInit() {
    var idKomik = this.route.snapshot.params['id'];
    this.getCommentRating(idKomik);
  }

}
