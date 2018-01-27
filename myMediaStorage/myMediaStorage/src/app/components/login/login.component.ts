import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SaveUserService } from '../../services/User/save-user.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private saveUserService: SaveUserService,
    private authService: AuthenticationService,
    private _flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: 9000 });
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user)
      .subscribe(data => {
        console.log(data);
      });
  }

}
