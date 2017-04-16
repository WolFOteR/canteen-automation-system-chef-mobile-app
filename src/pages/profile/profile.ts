import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AccountService } from '../../services/account-service';
import { ReversePipe } from '../../pipes/reverse.pipe';
import { OrderFilterByStatusPipe } from '../../pipes/order.pipe';
import { OrderDetailsPage } from '../order-details/order-details';
import { User } from "../../models/user.model";


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  user: User = {
    name: '',
    email: '',
    contact: '',
    address: '',
    password: '',
    imageURL: '',
    cnic: ''
  }
  constructor(public navCtrl: NavController, private acccountService: AccountService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.acccountService.getUserData().then((data: User) => {
      this.user = data;
      console.log(this.user);

    }).catch((error) => {
      console.log(error);
    });
  }

  clickName() {
    

  }

  clickEmail() {
    
  }
  clickCinc() {
    
  }
  clickAddress() {
    
  }

  clickContact() {
    
  }

  clickImage() {
    
  }

}