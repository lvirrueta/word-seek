// Imports
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

// DTO
import { WordSeekDto } from './wor-seek.dto';

// API
import { WordSeekAPI } from './word-seek.api';

// Constants
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WordSeekService {
  constructor( private http : HttpClient ) { 
  }

  private url = environment.apiWordSeek;

  solveWordSeek(dto: WordSeekDto): Observable<WordSeekAPI[]> {
    const resp = this.http.post(`${this.url}`, dto);
    return resp as unknown as Observable<WordSeekAPI[]>;
  }
}
