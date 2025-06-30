import { NgIf } from '@angular/common';
import { Component, input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-picker',
  imports: [NgIf, ReactiveFormsModule, BsDatepickerModule],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css'
})
export class DatePicker implements ControlValueAccessor {
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  // Code
  label = input<string>('');
  maxDate = input<Date>();
  bsConfig?: Partial<BsDatepickerConfig>;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    this.bsConfig = {
      containerClass: 'theme-default',
      dateInputFormat: 'DD MMMM YYYY'
    }  
  }

  get control(): FormControl{
    return this.ngControl.control as FormControl;
  }
}
