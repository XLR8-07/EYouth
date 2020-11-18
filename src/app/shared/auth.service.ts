import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private ngZone: NgZone, private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }

  public currentUser: any;
  public currentUserName : string;
  public currentUserEmail : string;
  public currentUserImageURL : string;
  public userStatus: string = '';
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);

  setUserStatus(userStatus: any): void{
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }

  signUp(signUpFormData){
    
    console.log(signUpFormData);
     let email = signUpFormData.controls['Email'].value;
     let password = signUpFormData.controls['Password'].value;
    this.afAuth.createUserWithEmailAndPassword(email,password)
    .then((userResponse)=>{
      //add user to the 'Users' collection
      let user = {
        id: userResponse.user.uid,
        email : userResponse.user.email,
        role: 'regular',
        Name : signUpFormData.controls['Name'].value,
        PhoneNo : signUpFormData.controls['PhoneNo'].value,
        imageURL : this.currentUserImageURL,
        Address : signUpFormData.controls['Address'].value,
        Description : signUpFormData.controls['Description'].value,
        Proficiency: signUpFormData.controls['Proficiency'].value,
        Job : signUpFormData.controls['Job'].value
      }

      this.firestore.collection("Users").add(user)
      .then(user=>{
        user.get().then(x => {
          //return the user data
          // console.log(x.data());
          this.currentUser = x.data();
          this.currentUserName = x.data().Name;
          this.currentUserEmail = x.data().email;
          this.setUserStatus(this.currentUser);
          this.router.navigate(['/dashboard']); 
        })
      }).catch(err =>{
        console.log(err);
        
      })
    }).catch(err=>{
      console.log("AN ERROR OCCURED",err);
      
    })
  }

  login(email: string, password: string) {
    console.log("HERE!")
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then((user)=>{
      console.log("HERE AGAIN!");
      this.firestore.collection("Users").ref.where("email", "==", user.user.email).onSnapshot(snap =>{
        console.log(snap.size)
        snap.forEach(userRef => {
          console.log("SNAP!!!!")
          console.log("userRef", userRef.data());
          this.currentUser = userRef.data();
          this.currentUserName = userRef.data().Name;
          this.currentUserEmail = userRef.data().email;
          this.currentUserImageURL = userRef.data().imageURL;
          //setUserStatus
          this.setUserStatus(this.currentUser)
          if(userRef.data().role !== "regular") {
            this.router.navigate(['/dashboard']); ///set own routing
          }else{
            
            this.router.navigate(['/dashboard']); // set own routing based on roles
          }
        })
      })
     
    }).catch(err => err)
  }

  logOut(){
    this.afAuth.signOut()
    .then(()=>{
      console.log("user signed Out successfully");
      //set current user to null to be logged out
      this.currentUser = null;
      //set the listenener to be null, for the UI to react
      this.setUserStatus(null);
      this.ngZone.run(() => this.router.navigate(["/login"]));

    }).catch((err) => {
      console.log(err);
    })
  }

  userChanges(){
    this.afAuth.onAuthStateChanged(currentUser => {
      if(currentUser){
        this.firestore.collection("Users").ref.where("username", "==", currentUser.email).onSnapshot(snap =>{
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            //setUserStatus
            this.setUserStatus(this.currentUser);
            console.log(this.userStatus)
            
            if(userRef.data().role !== "admin") {
             this.ngZone.run(() => this.router.navigate(["/"]));
            }else{
             this.ngZone.run(() => this.router.navigate(["/admin"])); 
            }
          })
        })
      }else{
        //this is the error you where looking at the video that I wasn't able to fix
        //the function is running on refresh so its checking if the user is logged in or not
        //hence the redirect to the login
        this.ngZone.run(() => this.router.navigate(["/login"]));
      }
    })
  }
}
