import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
    
  }

  onLogin() {
    this.isLoading = true;
    this.authService.login();
    this.loadingController.create({
      keyboardClose: true,
      message: 'Logging in...'
    }).then(loadingElement => {
      loadingElement.present();
      setTimeout(()=>{
        this.isLoading = false;
        this.router.navigateByUrl('/places/tabs/find');
        loadingElement.dismiss();
      },1000)
    })
    
    
    
  }

}
