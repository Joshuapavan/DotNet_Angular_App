import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Account } from '../../_services/account';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { TextInput } from "../_forms/text-input/text-input";
import { DatePicker } from "../_forms/date-picker/date-picker";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, TextInput, DatePicker],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  accountService = inject(Account);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  // Forms builder
  private fb = inject(FormBuilder);

  // Date
  maxDate = new Date();

  cancelRegister = output<boolean>();
  validationErrors: Array<String | undefined> = [];

  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);

  registerForm: FormGroup = new FormGroup({})

  ngOnInit(): void {
    this.initilaizeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  initilaizeForm(){
    this.registerForm = this.fb.group(
      {
        gender: ['male', Validators.required],
        knownAs: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        dateOfBirth: ['', Validators.required],

        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
        confirmPassword: ['', [Validators.required, this.isMatching('password')]],
      }
    );

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  isMatching(matchTo: string): ValidatorFn{
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }
  }

  register() {
    const dob = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value);
    this.registerForm.patchValue({dateOfBirth: dob});
    this.accountService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/home')
        this.toastr.success('Welcome ,' + response.username);
        this.cancel();
      },
      error: (error) => {
       this.validationErrors = error
      },
    });
  }
  
  togglePasswordVisibility(){
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPasswordVisibility(){
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.router.navigateByUrl('/login');
  }

  private getDateOnly(dob: string | undefined){
    if(!dob) return;
    return new Date(dob).toISOString().slice(0,10);
  }
}
