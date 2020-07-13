import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-booking-create',
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.scss'],
})
export class BookingCreateComponent implements OnInit {

  @Input() bookedPlace: Place;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  onBook() {
    this.modalController.dismiss({
      message: 'booked'
    }, 'confirm')
  }

  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }

}
