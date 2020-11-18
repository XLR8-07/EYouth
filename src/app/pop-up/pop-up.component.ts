import { Component, OnInit } from '@angular/core';
import { YouthService } from '../shared/youth.service';
import { Questions } from '../shared/questions.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NewQuestionComponent } from './new-question/new-question.component';
import { ProfileComponent } from './profile/profile.component';
import { Profiles } from 'src/app/shared/profiles.model';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  QuestionList : Questions[];
  profileList : Profiles[];
  profileLoaded : boolean = false;

  ngOnInit(): void {
    this.service.getQuestions().subscribe(actionArray2 => {
      this.QuestionList = actionArray2.map(item2 => {
        return {
          id: item2.payload.doc.id,
          ...item2.payload.doc.data() as Questions
        } as Questions;
      })
    });

    this.service.getProfiles().subscribe(actionArray2 => {
      this.profileList = actionArray2.map(item2 => {
        return {
          id: item2.payload.doc.id,
          ...item2.payload.doc.data() as Profiles
        } as Profiles;
      })
      console.log(this.profileList);
      this.profileLoaded = true;
    });
  }

  primaryColor: string;
  secondaryColor: string;


  constructor(public service : YouthService, public dialog : MatDialog) {
    this.changeTheme('red', 'yellow'); // Set default theme
  }

  changeTheme(primary: string, secondary: string) {

  }

  ShowProfile(profile : Profiles) {
    this.service.ClickedProfile = profile;
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = false;
    dialogconfig.autoFocus = true;
    dialogconfig.width = "60%";
    this.dialog.open(ProfileComponent,dialogconfig);
  }

  newQuestion(){
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = false;
    dialogconfig.autoFocus = true;
    dialogconfig.width = "60%";
    this.dialog.open(NewQuestionComponent,dialogconfig);
  }


}
