import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { MatInputModule } from "@angular/material/input";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YouthService } from './shared/youth.service';
import { MaterialModule } from './material/material.module';
import { NewQuestionComponent } from './pop-up/new-question/new-question.component';
import { ProfileComponent } from './pop-up/profile/profile.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ProfileFromComponent } from './profile-from/profile-from.component';
import { AuthService } from './shared/auth.service';
import {MatTabsModule} from '@angular/material/tabs';
import { AuthComponent } from './auth/auth.component';

import { SignUpComponent } from './auth/sign-up/sign-up.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PopUpComponent,
    NewQuestionComponent,
    ProfileComponent,
    ProfileFromComponent,
    AuthComponent,
    SignUpComponent,
    DashBoardComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    AngularFireModule,
    MatTabsModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    AngularFireStorageModule
  ],
  providers: [YouthService,AuthService],
  bootstrap: [AppComponent],
  entryComponents: [PopUpComponent, NewQuestionComponent, ProfileComponent,ProfileFromComponent,AuthComponent],
})
export class AppModule {}
