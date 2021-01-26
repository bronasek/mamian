import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import readXlsxFile from 'read-excel-file';

const isDragEvent = (event: any): event is DragEvent => !!event.dataTransfer;

export enum FileUploadState {
  INITIAL = 'initial',
  UPLOADING = 'uploading',
  COMPLETED = 'completed'
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef<HTMLInputElement>;

  @Input() initialText: string;
  @Input() completedText: string;
  @Input() currentState = FileUploadState.INITIAL;

  @Output() uploadingFile = new EventEmitter<void>();
  @Output() fileError = new EventEmitter<void>();
  @Output() fileUploaded = new EventEmitter<string[][]>();
  @Output() removeFile = new EventEmitter<void>();

  public fileUploadState = FileUploadState;
  public uploadedFileName: string;
  public dragHover = false;
  public isError = false;
  public acceptedFileTypes = '.xlsx';

  public dragOver(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.dragHover = true;
  }

  public dragLeave(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.dragHover = false;
  }

  private extractFileList(event: Event): FileList {
    return isDragEvent(event) ? event.dataTransfer.files : (event.target as HTMLInputElement).files;
  }

  public fileSelectHandler(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.dragHover = false;
    const files = Array.from(this.extractFileList(event));

    return this.validateFiles(files);
  }

  private validateFiles(files: File[]): void {
    this.uploadingFile.emit();

    if (files.length !== 1) {
      this.emitError();
      return;
    }

    const validFiles = files.filter(file => file.name.split('.').pop() === this.acceptedFileTypes.replace('.', ''));

    if (!validFiles.length) {
      this.emitError();
      return;
    }

    readXlsxFile(files[0])
      .then((rows: string[][]) => {
        // TODO: add file validation
        const isExcelDataValid = true;

        if (!isExcelDataValid) {
          this.emitError();
          return;
        }

        this.emitFile(rows, files[0]);
      });
  }

  private emitError(): void {
    this.isError = true;
    this.fileError.emit();
  }

  private emitFile(data: string[][], file: File): void {
    this.uploadedFileName = file.name;
    this.isError = false;
    this.fileUploaded.emit(data);
  }

  public onRemoveFile(): void {
    this.fileInput.nativeElement.value = '';
    this.uploadedFileName = '';
    this.removeFile.emit();
  }
}
