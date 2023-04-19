import { FormGroup } from "@angular/forms";

export function ConfirmPasswordValidators(controlName: string, matchControlName: string) {
    return (formGroup: FormGroup) => {
        const passwordControl = formGroup.controls[controlName];
        const confrimPasswordControl = formGroup.controls[matchControlName];

        if (confrimPasswordControl.errors && confrimPasswordControl.errors['ConfirmPasswordValidators']) {
            return;
        }
        if (passwordControl.value !== confrimPasswordControl.value) {
            confrimPasswordControl.setErrors({ ConfirmPasswordValidators: true })
        }
        else {
            confrimPasswordControl.setErrors(null)
        }

    }
}