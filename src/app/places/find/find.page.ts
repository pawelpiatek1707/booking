import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import {SegmentChangeEventDetail} from '@ionic/core'

@Component({
  selector: 'app-find',
  templateUrl: './find.page.html',
  styleUrls: ['./find.page.scss'],
})
export class FindPage implements OnInit {

  places: Place[] = [];
  loadedPlaces: Place[];

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.places = this.placesService.places;
    this.loadedPlaces = this.places.slice(1);
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }


}
