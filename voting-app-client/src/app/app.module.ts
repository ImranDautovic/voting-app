import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultsComponent } from './components/results/results.component';
import { UploadComponent } from './components/upload/upload.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgbAccordionModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
