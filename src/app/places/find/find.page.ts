import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import {SegmentChangeEventDetail} from '@ionic/core'
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-find',
  templateUrl: './find.page.html',
  styleUrls: ['./find.page.scss'],
})
export class FindPage implements OnInit, OnDestroy {

  loadedPlaces: Place[] = [];
  listenedLoaded: Place[];
  relevantPlaces: Place[];
  placesSubscription: Subscription;

  constructor(private placesService: PlacesService, private authService: AuthService) { }

  ngOnInit() {
    this.placesSubscription = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
      this.loadedPlaces = this.relevantPlaces.slice(1);
      console.log(this.relevantPlaces)
    })
 
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if(event.detail.value === 'all') {
      this.relevantPlaces = this.loadedPlaces;
      this.listenedLoaded = this.relevantPlaces.slice(1);
    } else {
      this.relevantPlaces = this.loadedPlaces.filter(place => {
        return place.userId !== this.authService.userId
      })
      this.listenedLoaded = this.relevantPlaces.slice(1);
    }
    console.log(event.detail);
  }

  ngOnDestroy() {
    if(this.placesSubscription) {
      this.placesSubscription.unsubscribe();
    } 
  }


}
