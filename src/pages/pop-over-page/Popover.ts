import { Component } from '@angular/core';
import { ViewController, NavController, App } from 'ionic-angular';
import { ProfilePage } from "../profile/profile";
import { PendingOrdersPage } from '../pending-orders/pending-orders';

@Component({
  template:
  `
  <ion-list no-lines>
  <ion-item (click)="clickProfile()">Profile</ion-item>
  <ion-item (click)="close()">Logout</ion-item>
  </ion-list>
`
})
export class PopoverPage {
  constructor(public viewCtrl: ViewController, private navCrtl: NavController, private appCrtl: App) { }

  close() {
    this.viewCtrl.dismiss();
  }

  clickProfile() {
    console.log("consle");
    this.viewCtrl.dismiss();
    // this.pendingOrder.navCtrl
    // this.navCrtl.push(ProfilePage);
    this.appCrtl.getRootNav().push(ProfilePage);

  }
}