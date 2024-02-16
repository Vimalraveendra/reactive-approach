import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactive-approach-form';
  genders = ['male', 'female'];
  signupForm:FormGroup;
  forbiddenUsernames=['Chris','Ana']

  ngOnInit(){
      this.signupForm=new FormGroup({
        userData:new FormGroup({
          username:new FormControl(null,[Validators.required,CustomValidators.forbiddenNames.bind(this)]),
          email:new FormControl(null,[Validators.required,Validators.email,],this.forbiddenEmails),
        }),
          gender:new FormControl('male'),
          hobbies:new FormArray([])
      })

      // this.signupForm.valueChanges.subscribe(
      //   (value)=>{
      //     console.log('value',value)
      //   }
      // )
      this.signupForm.statusChanges.subscribe(
        (status)=>{
          console.log('status',status)
        }
      )
      this.signupForm.setValue({
          userData:{
            username:"Mike",
            email:"mike@gmail.com"
          },
          gender:"male",
          hobbies:[]  
      });
      this.signupForm.patchValue({
        userData:{
          username:"Jose"
        }
      })
  }

  onSubmit(){
    console.log('this',this.signupForm)
    this.signupForm.reset({
      gender:'male'
    })
  }

  onAddHobby(){
    const control = new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  getControls() {
    return(<FormArray> this.signupForm.get('hobbies')).controls;
  }

  // forbiddenName = (control:FormControl):{[s:string]:boolean}=>{
  //   if(this.forbiddenUsernames.indexOf(control.value)!==-1){
  //     return {'nameIsForbidden':true}
  //   }else{
  //     return null;
  //   }
  // }

  forbiddenEmails(control:FormControl):Promise<any>|Observable<any>{
      const promise = new Promise<any>((resolve,reject)=>{
         setTimeout(()=>{
            if(control.value==="test@gmail.com"){
              resolve({'emailIsForbidden':true})
            }else{
              resolve(null)
            }
         },1500)
      })
      return promise;
  }
}
