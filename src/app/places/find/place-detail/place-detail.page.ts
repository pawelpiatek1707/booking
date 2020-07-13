import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { BookingCreateComponent } from 'src/app/bookings/booking-create/booking-create.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: Place;

  constructor(
    private route: ActivatedRoute,
     private navController: NavController,
     private placesService: PlacesService,
     private modalController: ModalController) { }

     ngOnInit() {
      this.route.paramMap.subscribe(paramsMap => {
        if(!paramsMap.has('id')){
          this.navController.navigateBack('/places/tabs/offers');
          return
        }
        const id = paramsMap.get('id');
        this.place = this.placesService.getPlace(id);
      })
     
    }

  onBookPlace() {
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

}
