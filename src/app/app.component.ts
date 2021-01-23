import { Component } from '@angular/core';

import { FileUploadState } from './file-upload/file-upload.component';

export enum InputType {
  EXCEL_ONE = 'excelOne',
  EXCEL_TWO = 'excelTwo',
}

export interface InputData {
  acceptedFileTypes: string;
  state: FileUploadState;
  initialText: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public inputType = InputType;
  public inputDataMapper: {
    [key in InputType]: InputData
  } = {
    [InputType.EXCEL_ONE]: {
      acceptedFileTypes: '.xlsx',
      state: FileUploadState.INITIAL,
      initialText: 'Excel Ein',
    },
    [InputType.EXCEL_TWO]: {
      acceptedFileTypes: '.xlsx',
      state: FileUploadState.INITIAL,
      initialText: 'Excel Zwei',
    },
  };

  public onFileChange(inputType: InputType): void {
    this.inputDataMapper[inputType].state = FileUploadState.UPLOADING;
    setTimeout(() => {
      this.inputDataMapper[inputType].state = FileUploadState.COMPLETED;
    }, 1000);
  }

  public onFileRemove(inputType: InputType): void {
    this.inputDataMapper[inputType].state = FileUploadState.INITIAL;
  }
}
