import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user = [];
  username = "";
  judul = "Aplikasi Komiku";
  user_id = "";
  user_passwd = "";
  login_user = "";
  login_passwd = "";
  login_error = "";

  constructor(public storage: Storage, public ls: LoginService) { }

  async ngOnInit() {
    await this.storage.create();
    this.user_id = await this.storage.get("user_id");
    this.username = await this.storage.get("user_name");
  }

  login() {
    this.ls.userLogin(this.login_user, this.login_passwd).subscribe(
      (data) => {
        if (data['result'] == "success") {
          this.user = data;
          this.user_id = this.login_user;
          this.user_passwd = this.login_passwd;
          this.username = data["user_name"];
          this.storage.set('user_id', this.user_id);
          this.storage.set('user_name', this.username);
        } else {
          this.login_error = "username atau password salah";
        }
      }
    );
  }
  logout() {
    this.storage.remove("user_id");
    this.storage.remove("user_name");
    window.location.reload();
  }
}
