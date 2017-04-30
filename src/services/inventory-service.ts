import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { InventoryItem } from '../models/inventory.model';
import * as firebase from 'firebase';

@Injectable()
export class InventoryService {
    constructor(private angularFire: AngularFire) { }

    getQuantityById(inventoryItemKey: string) {
        return new Promise((res, rej) => {
            this.angularFire.database.object('/inventory/' + inventoryItemKey).subscribe((data: InventoryItem) => {
                res(data.quantity);
            })
        })
    }

    updateInventoryQuantity(inventoryItemKey: string, quantity: number){
        console.log(inventoryItemKey);
        
          return new Promise((res, rej) => {
            firebase.database().ref('inventory/' + inventoryItemKey + "/quantity").transaction((data) => {
                if (data === null) {
                    return 1;
                }
                else {
                    return <number> data - quantity;
                }
                
            }, (error, committed, snapshot) => {
                if (error) {
                    rej(error);
                }

                else if (!committed) {
                    rej('The value change did not take place.')
                }

                else {
                    res(snapshot.val());
                }
            })
        })
    }
}