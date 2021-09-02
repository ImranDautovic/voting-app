import { Component, EventEmitter, Output } from '@angular/core';
import { FlatfileCustomer, FlatfileMethods, FlatfileSettings, FlatfileResults } from '@flatfile/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'voting-app';
  fileUploaded = false;

  onFileUploaded(event: any) {
    this.fileUploaded = true;
    setTimeout(() => {
      this.fileUploaded = false;
    }, 1000);
  }

}
