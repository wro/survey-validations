import {Injectable} from "@angular/core";
import {FormArray, FormGroup, ValidationErrors} from "@angular/forms";

@Injectable()
export class ValidationService {
  getErrors(controls:any, parentNames = []) {
    let errors: AllValidationErrors[] = [];

    Object.keys(controls).forEach(key => {
      let control = controls[key];
      if (control.valid) return;

      if (control instanceof FormGroup || control instanceof FormArray) {
        errors = errors.concat(this.getErrors(control.controls, parentNames.concat([key])));
      }

      const controlErrors: ValidationErrors = control.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          const fullControlName = parentNames.concat([key]).join('.');
          errors.push({
            control_name: key,
            error_name: keyError,
            error_value: controlErrors[ keyError ],
            full_control_name: fullControlName,
            message : fullControlName + '.' + keyError
          });
        });
      }
    });

    return errors;
  }
}

export interface AllValidationErrors {
  control_name: string;
  error_name: string;
  error_value: any;
  full_control_name: string;
  message: string;
}
