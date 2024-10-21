/* Reactive-form-approach */
import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs'; // this observable instantly emits a value.

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null; // that will tell angular that this control is valid.
  }
  return { doesNotContainQuestionMark: true };
}
//Async validator function
function emailIsunique(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null);
  }
  return of({ notUnique: true });
}

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsunique],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark,
      ],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }
  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  ngOnInit() {
    // const savedForm = window.localStorage.getItem('saved-login-form');
    // if (savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   // this.form.controls.email.setValue(loadedForm);
    //   this.form.patchValue() //exists if u partially want to update the form & available with reactive
    // }
    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'saved-login-form',
            JSON.stringify({ email: value.email })
          );
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    //console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
  }
}

/* Template-driven-approach*/

// import { Component, viewChild, inject } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { afterNextRender } from '@angular/core';
// import { DestroyRef } from '@angular/core';
// import { debounce, debounceTime } from 'rxjs';
// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule], //unlocks ngModel directive and other form-related features.
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
// })
// export class LoginComponent {
//   //defining it outside the onSubmit since we want to operate when form is active once loaded not when submitted.
//   private form = viewChild.required<NgForm>('form'); // alternative to get hold of form object template
//   private destroyRef = inject(DestroyRef);
//   constructor() {
//     afterNextRender(() => {
//       const savedForm = window.localStorage.getItem('saved-login-form');
//       if (savedForm) {
//         const loadedFormData = JSON.parse(savedForm);
//         const savedEmail = loadedFormData.email;
//         setTimeout(() => {
//           this.form().controls['email'].setValue(savedEmail);
//         }, 1);
//         // this.form().setValue({
//         //   email: savedEmail,
//         //   password:''
//         // })
//       }
//       const subscription = this.form()
//         .valueChanges?.pipe(debounceTime(500))
//         .subscribe({
//           next: (value) => {
//             window.localStorage.setItem(
//               'saved-login-form',
//               JSON.stringify({ email: value.email })
//             );
//           },
//         }); //valueChanges uses observable.
//       this.destroyRef.onDestroy(() => subscription?.unsubscribe());
//     });
//   }
//   onSubmit(formData: NgForm) {
//     if (formData.form.invalid) {
//       return;
//     }
//     const enteredEmail = formData.form.value.email;
//     const enteredPassword = formData.form.value.password;
//     //it will clear the form input and also the internally managed information about the form.
//     formData.form.reset();
//   }
// }
