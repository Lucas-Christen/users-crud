import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../../../core/models/user.model';
import { MaterialImports } from '../../../material.imports';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialImports],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnChanges {
  @Input() initialValue?: User;
  @Output() submitForm = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [this.minAgeOrNull(18)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValue'] && this.initialValue) {
      this.form.reset({
        name: this.initialValue.name,
        email: this.initialValue.email,
        age: this.initialValue.age ?? null
      });
    }
  }

  minAgeOrNull(min: number) {
    return (control: any) => {
      const v = control.value;
      if (v === null || v === undefined || v === '') return null; // opcional
      return Number(v) >= min ? null : { minAge: { required: min } };
    };
  }

  onSubmit() {
    if (this.form.valid) {
      const value: User = this.form.value;
      this.submitForm.emit(value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}