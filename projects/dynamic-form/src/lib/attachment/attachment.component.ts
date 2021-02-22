import { Component, OnInit, HostBinding, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';
@Component({
  selector: 'app-attachment',
  template: `

<div class="attachment">
  <div class="photo" *ngIf="showPhoto">
        <ng-container *ngIf="{data: (uploadedImage | isObservable) ? ( uploadedImage | withLoadingNoCheck | async): {value: uploadedImage} } as obs">
          <ng-template [ngIf]="obs.data.value">
            <img width="120px" height="120px" [src]="obs.data.value" alt="Photo">
          </ng-template>
          <ng-template [ngIf]="obs.data.error">
            <img width="120px" height="120px" src= 'assets/img/placeholder.png' alt="Photo">
              <h6 style="color: red;">Failed to load {{ obs.error }}</h6></ng-template>
          <ng-template [ngIf]="obs.data.loading">
            <img width="120px" height="120px" src= 'assets/img/placeholder.png' alt="Loading Photo...">
            <mat-progress-bar  mode="query"></mat-progress-bar>
          </ng-template>
        </ng-container>
  </div>
  <div class="attach-button">
  <button  style="width:100%;"  mat-raised-button color="default" (click)="inputFile.click()"
            title="Upload associated file" type="button">
              <mat-icon>attach_file</mat-icon>
          <span *ngIf="fileUploadedName; else weHaveFile"> {{ fileUploadedName }}</span>
          <ng-template #weHaveFile> {{ field.label }}</ng-template>
        </button> 
        <input hidden mat-raised-button color="default" #inputFile (change)="onFileSelected($event)"
        [accept]="accept" type="file" /> 
  </div> 
</div>`,
   styles: [
    ':host { display: grid}',
    '.attachment{display: flex;  flex-direction: row; align-items: end;}',
    '.photo{max-width: 100%}',
    'img{  border-radius: 5px; margin-right: 10px;  border: 4px solid #404dbc;}',
    'mat-progress-bar { margin-top: 5px; width: 120px; }',
    '.attach-button{width: 100%; height: 46px; }',
  ]
})
export class AttachmentComponent implements OnInit {
  @Output() attachedValue = new EventEmitter();
  field: FieldConfig;
  group: FormGroup;
  fileUploadedName: string;
  selectedFile: string | ArrayBuffer;
  uploadedImage: any;
  accept: string;
  showPhoto = false;
  // @HostBinding('class') rowClass = 'col-md-6';
  constructor() { }

  ngOnInit() {
    this.accept = this.field.acceptType ? this.field.acceptType.join() : '';
    this.uploadedImage = this.field.value;
    this.showPhoto = this.field.acceptType ? this.field.acceptType.findIndex(item => item === '.jpg' || item === '.png') > -1 : false  ;
  }


  onFileSelected(event) {
    const file = event.target.files[0];
    const fileUploadedNameData = file.name;
    if (fileUploadedNameData.length > 58) {
      this.fileUploadedName = fileUploadedNameData.slice(0, 58) + '...';
    } else {
      this.fileUploadedName = fileUploadedNameData;
    }
    const fileReader: FileReader = new FileReader();
    const self = this;
    fileReader.onloadend = (x) => {
      const attachmentFile = fileReader.result;
      this.uploadedImage = fileReader.result;
      self.group.controls[this.field.key].setValue(attachmentFile);
      this.attachedValue.emit({ attachmentFile, field: this.field });
    };
    fileReader.readAsDataURL(file);
  }

}
