import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomFormValidations {
  static email(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    if (!control.value.match(emailRegex)) {
      return { email: true };
    }
    return null;
  }

  static namePattern(control: AbstractControl): ValidationErrors | null {
    const namePatternRegex = /^[a-zA-ZñÑ ]+$/;
    if (!control.value.match(namePatternRegex)) {
      return { namePattern: true };
    }
    return null;
  }

  static strongPassword(control: AbstractControl): ValidationErrors | null {
    const strongPasswordRegex =
      '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$';
    if (!control.value.match(strongPasswordRegex)) {
      return { weakPassword: true };
    }
    return null;
  }

  static floatNumber(control: AbstractControl): ValidationErrors | null {
    const floatNumberRegex = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
    if (!control.value.match(floatNumberRegex)) {
      return { notFloatNumber: true };
    }
    return null;
  }

  static onlyNumbers(control: AbstractControl): ValidationErrors | null {
    const phoneNumberRegex = /^[0-9]+$/;
    if (!control.value.match(phoneNumberRegex)) {
      return { notPhoneNumber: true };
    }
    return null;
  }

  static imageUrl(control: AbstractControl): ValidationErrors | null {
    const imageUrlRegex = /^(https:\/\/[^"]*?.(?:jpg|gif|png))$/;
    if (!control.value.match(imageUrlRegex)) {
      return { notImageUrl: true };
    }
    return null;
  }

  static bankNumber(control: AbstractControl): ValidationErrors | null {
    const bankNumberRegex = /^[a-zA-Z0-9]+$/;
    if (!control.value.match(bankNumberRegex)) {
      return { notBankNumber: true };
    }
    return null;
  }
}
