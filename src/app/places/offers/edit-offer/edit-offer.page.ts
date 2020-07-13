import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  
  place: Place;

  constructor(
    private route: ActivatedRoute,
     private placesSerice: PlacesService,
     private navController: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('id')){
        this.navController.navigateBack('/pages/tabs/offers')
      }
        const id = paramMap.get('id');
        this.place = this.placesSerice.getPlace(id);
    })
  }

}
