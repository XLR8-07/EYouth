import { YouthService } from './../../shared/youth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  Taglist: string[] = [];

  questionFormData : FormGroup = new FormGroup({
    Details: new FormControl(''),
    Link: new FormControl(''),
    Q: new FormControl('',Validators.required),
    Topic: new FormControl(''),
    Tags: new FormControl(this.Taglist)
  });

  constructor(public service : YouthService, private dialogRef: MatDialogRef<NewQuestionComponent>) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.questionFormData)
    if(this.questionFormData.valid){
      this.service.insertNewQuestion(this.questionFormData.value).then(()=>{
        console.log("ENTRY SUCCESSFULL")
        this.dialogRef.close()
      })
    }
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

  remove(fruit: string): void {
    const index = this.Taglist.indexOf(fruit);

    if (index >= 0) {
      this.Taglist.splice(index, 1);
    }
  }

}
