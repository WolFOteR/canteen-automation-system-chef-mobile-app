import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AccountService } from '../../services/account-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, private accountService: AccountService) {

  }

  clickLogin(email: string, password: string) {
    this.accountService.loginUser(email, password).then(() => {}).catch(() => {});
  }
}
