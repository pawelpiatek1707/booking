import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {

  place: Place;
  placeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
     private navController: NavController,
     private placesService: PlacesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramsMap => {
      if(!paramsMap.has('id')){
        this.navController.navigateBack('/places/tabs/offers');
        return
      }
      const id = paramsMap.get('id');
      this.placeSubscription = this.placesService.getPlace(id).subscribe(place => {
        this.place = place
      })
      
    })
  }

  ngOnDestroy() {
    this.placeSubscription.unsubscribe();
  }

}
