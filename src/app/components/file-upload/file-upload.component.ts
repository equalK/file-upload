import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor {
  @ViewChild('fileInput') input!: ElementRef;
  private _value: File | undefined;

  onChanged: any = () => {};
  onTouched: any = () => {};

  get value(): File | undefined {
    return this._value;
  }

  set value(val: File) {
    this._value = val;
  }

  writeValue(value: File): void {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.input.nativeElement.isDisabled = isDisabled;
    }
  }

  onFileUpload($event: any): void {
    this.value = $event.target.files[0];
    this.onChanged($event.target.files[0]);
  }

  selectFile(): void {
    this.input.nativeElement.click();
  }
}
