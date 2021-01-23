import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FeatherModule } from 'angular-feather';
import { Eye, XCircle } from 'angular-feather/icons';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { EllipsisPipe } from './pipes/ellipsis.pipe';

import { AppComponent } from './app.component';
import { WmFileUploadComponent } from './file-upload/file-upload.component';

const icons = {
  Eye,
  XCircle,
};

@NgModule({
  declarations: [
    AppComponent,
    WmFileUploadComponent,
    EllipsisPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(icons),
    MatProgressBarModule,
  ],
  exports: [
    FeatherModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
