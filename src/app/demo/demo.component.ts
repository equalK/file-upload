import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FileUploadComponent } from '../components/file-upload/file-upload.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadComponent,
  ],
})
export class DemoComponent implements OnInit{
  private file: File | undefined;

  form = new FormGroup({
    file: new FormControl<File | null>(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => console.log(value));
  }

  print(): void {
    console.log(this.form.value);
  }

  onFileChange($event: any): void {
    this.file = $event.target.files[0];
  }

  patch(): void {
    this.form.patchValue({file: this.file});
  }
}
