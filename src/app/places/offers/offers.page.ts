import { Component, OnInit, ViewChild } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  offers: Place[] = [];

  constructor(private placesService: PlacesService, private router: Router) { }

  ngOnInit() {
    this.offers = this.placesService.places;
  }

  onEdit(offerId: string, slideItem:IonItemSliding ){
    setTimeout(()=>{
      slideItem.close()
    },1)
    
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId])
    // console.log(slidingItem);
  }

}
