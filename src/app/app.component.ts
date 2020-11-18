import { Component } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { ProfileFromComponent } from './profile-from/profile-from.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Bubbles';
  constructor(private dialog : MatDialog, private router: Router){
    
  }

  onClick(){
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = false;
    dialogconfig.autoFocus = true;
    dialogconfig.width = "60%";
    this.dialog.open(PopUpComponent,dialogconfig);
  }

  AddProfile(){
    const ProfileDialog = new MatDialogConfig();
    ProfileDialog.disableClose = false;
    ProfileDialog.autoFocus = true;
    ProfileDialog.width = "45%";
    ProfileDialog.height = "100vh"
    this.dialog.open(ProfileFromComponent, ProfileDialog);
  }

  onAuthClick(){
    const AuthDialog = new MatDialogConfig();
    AuthDialog.disableClose = false;
    AuthDialog.autoFocus = true;
    AuthDialog.maxWidth = "80%";
    AuthDialog.maxHeight = "90vh"
    this.dialog.open(AuthComponent, AuthDialog);
  }

  DashBoardTestClick(){
    this.router.navigate(['dashboard']);
  }
}
