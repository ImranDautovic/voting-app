import { Component, Input, OnInit } from '@angular/core';
import { VotingService } from 'src/app/services/voting.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  cities: any;
  @Input()
  set fileUploaded(fileUploaded: boolean) {
    if (fileUploaded) {
      this.getResults();
    }
  }
  constructor(private votingService: VotingService) {}

  ngOnInit(): void {
    this.getResults();
  }

  getResults() {
    this.votingService.getVotes().subscribe((response) => {
        this.cities = response.data
        this.fileUploaded = false;
    });
  }
}
