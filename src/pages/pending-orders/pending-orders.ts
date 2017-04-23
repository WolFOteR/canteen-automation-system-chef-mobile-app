import { Component } from '@angular/core';
import { NavController, PopoverController, ViewController, App } from 'ionic-angular';
import { OrderService } from '../../services/order-service';
import { ReversePipe } from '../../pipes/reverse.pipe';
import { OrderFilterByStatusPipe } from '../../pipes/order.pipe';
import { OrderDetailsPage } from '../order-details/order-details';
import { PopoverPage } from '../pop-over-page/Popover';
import { AccountService } from "../../services/account-service";
import { ProfilePage } from "../profile/profile";
import { LoginPage } from "../login/login";
import { Subscription } from "rxjs";

// @Component({
//   template: `
//     <ion-list>
//       <ion-list-header>Ionic</ion-list-header>
//       <button ion-item (click)="close()">Learn Ionic</button>
//       <button ion-item (click)="close()">Documentation</button>
//       <button ion-item (click)="close()">Showcase</button>
//       <button ion-item (click)="close()">GitHub Repo</button>
//     </ion-list>
//   `
// })
// class PopoverPage {
//   constructor(public viewCtrl: ViewController) {}

//   close() {
//     this.viewCtrl.dismiss();
//   }
// }

@Component({
  selector: 'page-pending-orders',
  templateUrl: 'pending-orders.html'
})
export class PendingOrdersPage {
  orderList: any;
  orderSubscription: Subscription;
  constructor(public navCtrl: NavController, private orderService: OrderService, private accountService: AccountService, private app: App) { }

  ngOnInit() {
    this.loadOrderData();
  }

  clickOrder(orderId: string) {
    this.navCtrl.push(OrderDetailsPage, {
      orderKey: orderId
    });
  }

  clickLogout() {
    this.orderSubscription.unsubscribe();
    this.accountService.logoutUser().then(() => {

      this.app.getRootNav().setRoot(LoginPage);
    }).catch((error) => {
      this.loadOrderData();
      console.log(error);
    })
  }

  ionViewDidLeave() {
    this.orderSubscription.unsubscribe();
  }

  clickProfile() {
    this.navCtrl.push(ProfilePage);
  }

  loadOrderData() {
    this.orderSubscription = this.orderService.getOrders().subscribe((orderData) => {
      this.orderList = orderData
    })
  }

}



