import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';

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
export class WmFileUploadComponent {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef<HTMLInputElement>;

  @Input() acceptedFileTypes: string;
  @Input() initialText: string;
  @Input() completedText: string;
  @Input() currentState = FileUploadState.INITIAL;
  @Input() showPreview = false;

  @Output() fileChange: EventEmitter<File[]> = new EventEmitter();
  @Output() removeFile: EventEmitter<void> = new EventEmitter();

  public fileUploadState = FileUploadState;
  public uploadedFileName: string;
  public dragHover = false;
  public isError = false;

  private files: File[];

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

  private emitFiles(files: File[]): void {
    this.files = files;
    this.uploadedFileName = files[0].name;
    this.isError = false;
    this.fileChange.emit(files);
  }

  private validateFiles(files: File[]): void {
    const fileTypes: string[] = this.acceptedFileTypes
      && this.acceptedFileTypes.replace(/\s/g, '').replace(/\./g, '').split(',');

    if (!fileTypes) {
      return this.emitFiles(files);
    }

    const validFiles = files.filter(file => fileTypes.includes(file.name.split('.').pop()));

    if (!validFiles.length) {
      this.isError = true;
      return;
    }

    this.emitFiles(validFiles);
  }

  public onRemoveFile(): void {
    this.fileInput.nativeElement.value = '';
    this.uploadedFileName = '';
    this.removeFile.emit();
  }
}
