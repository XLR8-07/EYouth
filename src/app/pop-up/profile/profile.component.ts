import { Component, OnInit } from '@angular/core';
import { YouthService } from 'src/app/shared/youth.service';
import { Profiles } from 'src/app/shared/profiles.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  

  constructor(public service : YouthService) { }

  ngOnInit(): void {
    
  }

  onClickCV(){
    let link = this.service.ClickedProfile.CV;
    window.open(link);
  }

}

