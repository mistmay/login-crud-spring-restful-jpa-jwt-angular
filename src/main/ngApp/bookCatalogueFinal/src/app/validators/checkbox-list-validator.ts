import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function checkboxListValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value.find((element: boolean) => element)) {
            return null;
        } else {
            return { notChecked: true };
        }
    }
}