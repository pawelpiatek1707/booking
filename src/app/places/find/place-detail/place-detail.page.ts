import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { BookingCreateComponent } from 'src/app/bookings/booking-create/booking-create.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {

  place: Place;
  placeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
     private navController: NavController,
     private placesService: PlacesService,
     private modalController: ModalController,
     private actionSheetController: ActionSheetController) { }

     ngOnInit() {
      this.route.paramMap.subscribe(paramsMap => {
        if(!paramsMap.has('id')){
          this.navController.navigateBack('/places/tabs/offers');
          return
        }
        const id = paramsMap.get('id');
        this.placeSubscription = this.placesService.getPlace(id).subscribe(place => {
          this.place = place;
        })
      })
     
    }

  onBookPlace() {
    console.log('clicked')
    this.actionSheetController.create({
      header: 'Chhose an action',
      buttons: [
        {
          text: 'Select date',
          handler: ()=>{
            this.onBookingModal('select')
          }
        },
        {
          text: 'Random date',
          handler: ()=>{
            this.onBookingModal('random')
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheet => {
      actionSheet.present();
    })
   
  }

  onBookingModal(mode: 'select' | 'random') {
    console.log(mode);

    this.modalController.create({
      component: BookingCreateComponent,
       componentProps: {
         bookedPlace: this.place
       }}).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resultData => {
      console.log(resultData.data);
      console.log(resultData.role);
    })
  }

  ngOnDestroy() {
    if(this.placeSubscription){
      this.placeSubscription.unsubscribe();
    }
  }

}
