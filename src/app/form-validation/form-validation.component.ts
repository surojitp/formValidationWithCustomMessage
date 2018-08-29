import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit {

  rForm:FormGroup;
  name:string;
  description:string;
  nameAlert="Name is required"
  descriptionAlert="Description between 10 to 20 character"

  


  constructor(private fb:FormBuilder) { 

    this.rForm = fb.group({
      'name':[null,Validators.required],
      'description':[null,Validators.compose([
        Validators.required,
        Validators.minLength(10),   
        Validators.maxLength(20)
      ])],
      'validate':''


    })
  }

  ngOnInit() {
    this.rForm.get('validate').valueChanges.subscribe(
      (val) => {
        if(val ==1){
          this.rForm.get('name').setValidators([
            Validators.required,
            Validators.minLength(3)
          ])
          this.nameAlert = "You need to specify atleast 3 character"
        }
        else{
          this.rForm.get('name').setValidators([
            Validators.required
          ])
        }
        this.rForm.get('name').updateValueAndValidity()
      }
    )
  }
  formSubmit(post){
    console.log(post)
    this.name = post.name;
    this.description = post.description;
  }


}
