import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { FoodService } from './food-service';
import { Order } from '../models/order.model';
import { InventoryItem } from '../models/inventory.model';
import { FoodItem } from '../models/food.model';
import { InventoryService } from './inventory-service';

@Injectable()
export class OrderService {
    constructor(private angularFire: AngularFire, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private foodService: FoodService, private inventoryService: InventoryService) { }

    getOrders() {
        // this.angularFire.database.list('/orders/'
        // , {
        //     query: {
        //         orderByChild: 'status/staffMemberId',
        //         equalTo: localStorage.getItem('uid')
        //     }
        // }
        // ).subscribe((data) => console.log(data));

        return this.angularFire.database.list('/orders/', {
            query: {
                orderByChild: 'status/staffMemberId',
                equalTo: localStorage.getItem('uid')
            }
        })
    }

    fetchOrderDetails(key) {
        let loading = this.loadingCtrl.create({
            content: 'Loading order items...',
            dismissOnPageChange: true
        });
        loading.present();
        return new Promise((res, rej) => {
            this.angularFire.database.object('/orders/' + key).subscribe((data: Order) => {
                loading.dismiss().catch(() => { });
                res(data);
            });
        });
    }

    getJobCount() {
        return new Promise((res, rej) => {
            let countSubscription = this.angularFire.database.object('/roles/chefs/' + localStorage.getItem('uid')).subscribe((data: any) => {
                res(data.job_count);
                countSubscription.unsubscribe();
            })
        })
    }

    updateOrderStatus(orderId: string, status: string) {
        let loading = this.loadingCtrl.create({
            content: 'Updating order...'
        });
        loading.present();
        return new Promise((res, rej) => {
            if (status == 'Accepted by Chef') {
                this.updateInventory(orderId).then(() => {
                    this.angularFire.database.object('/orders/' + orderId + '/status').update({
                        state: status
                    }).then(() => {
                        this.toastCtrl.create({
                            message: 'Order updated.',
                            duration: 4500
                        }).present();
                        loading.dismiss();
                        res();
                    }).catch(() => {
                        loading.dismiss();
                        rej();
                    });
                })
            }

            else if (status == 'Order Ready') {
                this.angularFire.database.object('/orders/' + orderId + '/status').update({
                    state: status
                }).then(() => {
                    this.getJobCount().then((count: number) => {
                        this.angularFire.database.object('roles/chefs/' + localStorage.getItem('uid')).update({
                            job_count: <number>count - 1
                        }).then(() => {
                            this.toastCtrl.create({
                                message: 'Order updated.',
                                duration: 4500
                            }).present();
                            loading.dismiss();
                            res();
                        }).catch(() => {
                            rej();
                        });
                    }).catch((error) => {
                        console.log(error);
                        loading.dismiss();
                        rej()
                    });
                }).catch(() => {
                    loading.dismiss();
                    rej();
                });
            }

            // this.updateInventory(orderId).then(() => {
            //     this.angularFire.database.object('/orders/' + orderId + '/status').update({
            //         state: status
            //     }).then(() => {
            //         this.toastCtrl.create({
            //             message: 'Order updated.',
            //             duration: 4500
            //         }).present().then(() => loading.dismiss());
            //         res();
            //     }).catch(() => {
            //         loading.dismiss().then(() => rej());
            //     });
            // })
        })
    }

    getOrderById(orderId: string) {
        return new Promise((res, rej) => {
            let orderSubscription = this.angularFire.database.object('/orders/' + orderId).subscribe((data) => {
                // console.log(data);
                res(data.items);
                orderSubscription.unsubscribe();
            })
        });
    }

    updateInventory(orderId: string) {
        return new Promise((res, rej) => {
            this.getOrderById(orderId).then((orderFoodList: Array<any>) => {
                console.log(orderFoodList);
                orderFoodList.forEach((foodItem, index) => {
                    this.foodService.getFoodItemById(foodItem.foodId).then((data: FoodItem) => {
                        data.inventory_item.forEach((inventoryItem) => {
                            console.log(inventoryItem);
                            let quantity = Number(foodItem.quantity) * Number(inventoryItem.quantity);
                            this.inventoryService.updateInventoryQuantity(inventoryItem.id, quantity).then((data) => {
                                console.log(data);
                            })
                        });
                    })
                    if (index == (orderFoodList.length) - 1) {
                        res();
                    }
                });
                // res("");
            }).catch((error) => {
                console.log(error.message);
                rej(error.message)
            })
        })
    }
}