import { FormControl } from "@angular/forms";


export class CustomValidators{
  static forbiddenNames(this:any,control:FormControl):{[s:string]:boolean}{
      if(this.forbiddenUsernames.indexOf(control.value)!==-1){
        return {'nameIsForbidden':true}
      }else{
        return null;
      }
  }
}