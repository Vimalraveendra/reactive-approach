import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";


export class CustomValidators{
  static forbiddenNames(this:any,control:FormControl):{[s:string]:boolean}{
      if(this.forbiddenUsernames.indexOf(control.value)!==-1){
        return {'nameIsForbidden':true}
      }else{
        return null;
      }
  }

  static asyncForbiddenEmails(control:FormControl):Promise<any>|Observable<any>{
     const promise= new Promise<any>((resolve,reject)=>{
         setTimeout(()=>{
             if(control.value==="test@gmail.com"){
                resolve({'emailIsForbidden':true})
             }else{
                resolve(null)
             }
         },1500)
     })
     return promise
  }
}