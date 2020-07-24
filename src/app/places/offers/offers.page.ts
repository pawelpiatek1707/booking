import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  offers: Place[] = [];
  private placesSubscription: Subscription;

  constructor(private placesService: PlacesService, private router: Router) { }

  ngOnInit() {
    this.placesSubscription = this.placesService.places.subscribe(places=>{
      this.offers = places
    })
  }

  onEdit(offerId: string, slideItem:IonItemSliding ){
    setTimeout(()=>{
      slideItem.close()
    },1)
    
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId])
    // console.log(slidingItem);
  }

  ngOnDestroy() {
    if(this.placesSubscription){
      this.placesSubscription.unsubscribe();
    }
  }

}
