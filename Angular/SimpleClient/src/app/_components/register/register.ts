import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Account } from '../../_services/account';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, JsonPipe, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  accountService = inject(Account);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  cancelRegister = output<boolean>();
  validationErrors: Array<String> = [];

  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);

  registerForm: FormGroup = new FormGroup({})

  model: any = {};


  ngOnInit(): void {
    this.initilaizeForm();
  }

  initilaizeForm(){
    this.registerForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
        confirmPassword: new FormControl('', [Validators.required, this.isMatching('password')]),
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
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        this.toastr.success('Welcome ,' + response.username);
        this.cancel();
      },
      error: (error) => {
        if (Array.isArray(error)) {
          this.toastr.error('Error while Signing up.');
          this.validationErrors = error;
        }
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
}
