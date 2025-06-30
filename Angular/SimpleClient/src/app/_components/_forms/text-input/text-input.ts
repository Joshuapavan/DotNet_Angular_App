import { NgIf } from '@angular/common';
import { Component, input, OnInit, Self, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css'
})
export class TextInput implements ControlValueAccessor {
  // Methods of Control value accessor
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  // Code 
  label = input<string>('');
  type = input<string>('');
  showPassword = signal<boolean>(false);

  // since services are singletons, each input will have their own label and type. 
  // but we want it to have it's own values of each one
  constructor(@Self() public ngControl: NgControl){
    this.ngControl.valueAccessor = this;
  }

  togglePasswordVisibility(){
    this.showPassword.set(!this.showPassword());
  }

  get control(): FormControl{
    return this.ngControl.control as FormControl;
  }


}
