import { Component } from '@angular/core';

import { FileUploadState } from './file-upload/file-upload.component';

export enum InputType {
  EXCEL_ONE = 'excelOne',
  EXCEL_TWO = 'excelTwo',
}

export interface InputData {
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
      state: FileUploadState.INITIAL,
      initialText: 'Excel Ein',
    },
    [InputType.EXCEL_TWO]: {
      state: FileUploadState.INITIAL,
      initialText: 'Excel Zwei',
    },
  };

  public onFileUploading(inputType: InputType): void {
    this.inputDataMapper[inputType].state = FileUploadState.UPLOADING;
  }

  public onFileError(inputType: InputType): void {
    this.inputDataMapper[inputType].state = FileUploadState.INITIAL;
  }

  public onFileUploaded(data: string[][], inputType: InputType): void {
    this.inputDataMapper[inputType].state = FileUploadState.COMPLETED;
    // TODO: do something with data
  }

  public onFileRemove(inputType: InputType): void {
    this.inputDataMapper[inputType].state = FileUploadState.INITIAL;
  }
}
