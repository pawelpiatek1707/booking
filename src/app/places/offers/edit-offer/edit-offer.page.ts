import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { NavController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  form: FormGroup;
  place: Place;
  placeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
     private placesSerice: PlacesService,
     private navController: NavController,
     private router: Router,
     private loaderController: LoadingController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('id')){
        this.navController.navigateBack('/pages/tabs/offers')
      }
        const id = paramMap.get('id');
        this.placeSubscription = this.placesSerice.getPlace(id).subscribe(place => {
          this.place = place;
        })
        this.form = new FormGroup({
          title: new FormControl(this.place.title, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(this.place.description, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(180)]
          })
        });
       
    })
  }

  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loaderController.create({
      message: 'Updating place...'
    }).then(loadingEl => {
      loadingEl.present();
      this.placesSerice.updatePlace(this.place.id, this.form.value.title, this.form.value.description)
        .subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigateByUrl('/places/tabs/offers');
        })
    })
   
  }

  ngOnDestroy() {
    if(this.placeSubscription) {
      this.placeSubscription.unsubscribe();
    }
  }

}
