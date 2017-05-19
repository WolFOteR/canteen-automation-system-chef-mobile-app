import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import { AccountService } from '../../services/account-service';
import { OrderDetailsPage } from '../order-details/order-details';
import { StaffMember } from "../../models/staff-member.model";
import { Camera } from "ionic-native";


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  // emailRegex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$';
  // numberRege = '\d+';
  staffMember: StaffMember = {
    name: '',
    email: '',
    contact: '',
    address: '',
    imageURL: '',
    cnic: '',
    $key: '',
    status: ''
  }
  constructor(public navCtrl: NavController, private accountService: AccountService, private alertCtrl: AlertController, private actionCtrl: ActionSheetController, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.loadUserData();
  }

  clickName() {
    this.alertCtrl.create({
      subTitle: 'Enter new name',
      inputs: [
        {
          name: 'txtNewName',
          value: this.staffMember.name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (data) => {
            if (data.txtNewName != '') {
              this.accountService.updateInfo(data.txtNewName, this.staffMember.imageURL).then(() => {
                this.loadUserData();
              }).catch(() => { })
            }
            else {
              this.toastCtrl.create({
                message: 'Name cannot be empty',
                duration: 4500
              }).present();
            }
          }
        }
      ]
    }).present();
  }

  clickEmail() {
    this.alertCtrl.create({
      subTitle: 'Enter new email',
      inputs: [
        {
          name: 'txtEmail',
          value: this.staffMember.email
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (data) => {
            // if (this.emailRegex.match(data.txtEmail)) {
              this.accountService.updateEmail(data.txtEmail).then(() => {
                this.loadUserData();
              })
            // }
            // else {
            //   this.toastCtrl.create({
            //     message: 'Please enter valid password',
            //     duration: 4500
            //   }).present();
            // }
          }
        }
      ]
    }).present();
  }

  clickCnic() {
    this.alertCtrl.create({
      subTitle: 'Enter new Cnic',
      inputs: [
        {
          name: 'txtNewCnic',
          value: this.staffMember.cnic
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (data) => {
            // if (this.numberRege.match(data.txtNewCnic) && data.txtNewCnic != '') {
              this.accountService.updateCnic(data.txtNewCnic).then(() => {
                this.loadUserData();
              })
            // }
            // else {
            //   this.toastCtrl.create({
            //     message: 'Please enter valid Cnic',
            //     duration: 4500
            //   }).present();
            // }
          }
        }
      ]
    }).present();
  }

  clickAddress() {
    this.alertCtrl.create({
      subTitle: 'Enter new address',
      inputs: [
        {
          name: 'txtNewAddress',
          value: this.staffMember.address
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (data) => {
            this.accountService.updateAddress(data.txtNewAddress).then(() => {
              this.loadUserData();
            })
          }
        }
      ]
    }).present();
  }

  clickContact() {
    this.alertCtrl.create({
      subTitle: 'Enter new contact',
      inputs: [
        {
          name: 'txtNewContact',
          value: this.staffMember.contact
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (data) => {
            // if (this.numberRege.match(data.txtNewContact) && data.txtNewContact != '') {
              this.accountService.updateContact(data.txtNewContact).then(() => {
                this.loadUserData();
              })
            // }
            // else {
            //   this.toastCtrl.create({
            //     message: 'Please enter valid Number',
            //     duration: 4500
            //   }).present();
            // }
          }
        }
      ]
    }).present();
  }

  clickImage() {
    this.actionCtrl.create({
      title: 'Select source',
      buttons: [
        {
          text: 'Gallery',
          icon: 'image',
          handler: () => {
            Camera.getPicture({
              targetWidth: 300,
              targetHeight: 300,
              quality: 100,
              allowEdit: true,
              correctOrientation: false,
              // saveToPhotoAlbum: true,
              encodingType: Camera.EncodingType.JPEG,
              mediaType: Camera.MediaType.PICTURE,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            }).then((selectedImage) => {
              this.accountService.uploadImage(selectedImage).then((downloadUrl: string) => {
                this.accountService.updateInfo(this.staffMember.name, downloadUrl).then(() => {
                  this.staffMember.imageURL = downloadUrl;
                  this.alertCtrl.create({
                    subTitle: 'Your image has been successfully updated.',
                    buttons: [
                      {
                        text: 'OK',
                        role: 'cancel'
                      }
                    ]
                  }).present();
                }).catch(() => { })
              }).catch((error) => {
                this.alertCtrl.create({
                  subTitle: 'Failed to upload image. Please try again.',
                  buttons: [
                    {
                      text: 'OK',
                      role: 'cancel'
                    }
                  ]
                }).present()
              })
            }).catch((error) => {
              this.alertCtrl.create({
                message: error,
                buttons: [
                  {
                    text: 'OK',
                    role: 'cancel'
                  }
                ]
              }).present();
            })
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            Camera.getPicture({
              targetWidth: 300,
              targetHeight: 300,
              quality: 100,
              allowEdit: true,
              correctOrientation: false,
              // saveToPhotoAlbum: true,
              encodingType: Camera.EncodingType.JPEG,
              mediaType: Camera.MediaType.PICTURE,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA
            }).then((selectedImage) => {
              this.accountService.uploadImage(selectedImage).then((downloadUrl: string) => {
                this.accountService.updateInfo(this.staffMember.name, downloadUrl).then(() => {
                  this.staffMember.imageURL = downloadUrl;
                  this.alertCtrl.create({
                    subTitle: 'Your image has been successfully updated.',
                    buttons: [
                      {
                        text: 'OK',
                        role: 'cancel'
                      }
                    ]
                  }).present();
                }).catch(() => { })
              }).catch(() => {
                this.alertCtrl.create({
                  subTitle: 'Failed to upload image. Please try again.',
                  buttons: [
                    {
                      text: 'OK',
                      role: 'cancel'
                    }
                  ]
                }).present()
              })
            }).catch((error) => {
              this.alertCtrl.create({
                message: error,
                buttons: [
                  {
                    text: 'OK',
                    role: 'cancel'
                  }
                ]
              }).present();
            })
          }
        },
        {
          text: 'Cancel',
          icon: 'close'
        }
      ]
    }).present();
  }

  loadUserData() {
    this.accountService.getUserData().then((data: StaffMember) => {
      this.staffMember = data;
    }).catch((error) => {
      console.log(error);
    });
  }
}