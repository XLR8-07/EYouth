import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'] 
})
export class SignUpComponent implements OnInit {

  hide = true;
  selectedImage: any = null;
  imageFile : File;
  imageURL : '';
  imgSrc : string = '/assets/img/image_placeholder2.png';
  isSubmitted : boolean = false;
  Taglist: string[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  signUpForm : FormGroup = new FormGroup({
    Name : new FormControl('',Validators.required),
    Email : new FormControl('',Validators.required),
    Password : new FormControl('',Validators.required),
    PhoneNo : new FormControl('',Validators.required),
    imageURL : new FormControl('',Validators.required),
    Address : new FormControl('',Validators.required),
    Description : new FormControl('',Validators.required),
    Proficiency: new FormControl(this.Taglist),
    Job : new FormControl('',Validators.required)
  })

  constructor(public Authservice: AuthService, private storage: AngularFireStorage, private dialogRef: MatDialogRef<SignUpComponent>) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let email = this.signUpForm.controls.Email.value;
    let password = this.signUpForm.controls.Password.value;
    console.log(email,password);
    this.uploadImage().then(()=>{
      this.Authservice.signUp(this.signUpForm);
    } 
    );
    // this.testClick();

    
    this.dialogRef.close();
    // this.signUpForm.reset();
    // this.resetSignUpForm();
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

  
  showPreview(event : any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = '/assets/img/image_placeholder2.png';
      this.selectedImage = null;
    }
  }
  testClick(){
    var filePath = `userImages/${this.selectedImage.name}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe((url)=>{
          // this.signUpForm.controls['imageURL'].setValue(url);
        })
      })
    ).subscribe(()=>{
    })
  }

  handleFiles(event){
    this.imageFile = event.target.files[0];
  }

  async uploadImage(){
    if(this.selectedImage){
      const filePath = `userImages/${this.selectedImage.name}`;
      const snap = await this.storage.upload(filePath,this.selectedImage);
      this.getURL(snap);

    }
    else{
      console.log('PLEASE SELECT AN IMAGE!!');
    }
  }

  async getURL(snap : firebase.storage.UploadTaskSnapshot){
    const url = await snap.ref.getDownloadURL();
    this.imageURL = url;
    this.Authservice.currentUserImageURL = this.imageURL;
    // this.signUpForm.controls['imageURL'].setValue(this.imageURL);
    console.log(this.imageURL);
  }

  resetSignUpForm(){
    this.signUpForm.reset();
    this.Taglist = [];
    this.signUpForm.setValue({
      Name : '',
      Email : '',
      Password : '',
      Work : '',
      PhoneNo : '',
      imageURL : '',
      Address : '',
      Description : '',
      Proficiency: this.Taglist,
      Job : ''    
    });
    this.imgSrc = '/assets/img/image_placeholder2.png';
  }

}
