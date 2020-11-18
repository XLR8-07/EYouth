import { Component, OnInit } from '@angular/core';
import { YouthService } from '../shared/youth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialogRef } from '@angular/material/dialog';
import { Profiles } from '../shared/profiles.model';

@Component({
  selector: 'app-profile-from',
  templateUrl: './profile-from.component.html',
  styleUrls: ['./profile-from.component.scss']
})
export class ProfileFromComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  Taglist: string[] = [];
  Paragraphs : string[] = [];
  profileList: Profiles[];
  MaxPID: number = 0;

  paras : string[] = [ 'Paragraph1', 'Paragraph2']

  profileFormData: FormGroup = new FormGroup({
    Address: new FormControl('',Validators.required),
    CV: new FormControl(''),
    Email: new FormControl('',Validators.required),
    Name: new FormControl('',Validators.required),
    Password: new FormControl('',Validators.required),
    Phone: new FormControl(''),
    Paragraphs: new FormControl(this.paras),
    Profession: new FormControl('',Validators.required),
    Proficiency: new FormControl(this.Taglist),
    RatingAVG: new FormControl(0),
    RatingCunt: new FormControl(0),
    User_ID: new FormControl(this.MaxPID),
    Profile_Image: new FormControl('')
  });

  constructor(public service: YouthService) { }

  ngOnInit(): void {
    this.getAllProfiles()
  }

  getAllProfiles(){
    this.service.getProfiles().subscribe(actionArray2 => {
      this.profileList = actionArray2.map(item2 => {
        return {
          id: item2.payload.doc.id,
          ...item2.payload.doc.data() as Profiles
        } as Profiles;
      })
      for (var value of this.profileList){
        if(value.User_ID > this.MaxPID){
          this.MaxPID = value.User_ID;
        }
      }
      this.MaxPID = this.MaxPID + 1;
      console.log('User ID max', this.MaxPID);
    });
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.Taglist.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(Tag: string): void {
    const index = this.Taglist.indexOf(Tag);

    if (index >= 0) {
      this.Taglist.splice(index, 1);
    }
  }

  search(text:any){
    for (let l of text){
      console.log(l)
    }
  }

  onSubmit(){
    this.profileFormData.controls['User_ID'].setValue(this.MaxPID);
    console.log(this.profileFormData);
    this.service.insertProfileForm(this.profileFormData.value).then(()=>{
      console.log("DATA Setting done!");
    })
  }
}
