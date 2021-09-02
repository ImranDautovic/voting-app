import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VotingService {
  constructor(private http: HttpClient) {}

  getVotes(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/voting/results').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.http.post('http://localhost:3000/voting/upload', formData).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
