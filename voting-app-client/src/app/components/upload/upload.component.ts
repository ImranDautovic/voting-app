import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VotingService } from 'src/app/services/voting.service';




@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  constructor(private votingService: VotingService) {}
  

  ngOnInit(): void {
    
     };
  

  fileToUpload: any;
  @Output() onFileUploaded:EventEmitter<boolean>
       = new EventEmitter<boolean>();

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
    this.uploadFileToActivity();
  }

  uploadFileToActivity() {
    this.votingService.postFile(this.fileToUpload).subscribe(
      (data) => {
        this.onFileUploaded.emit(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
