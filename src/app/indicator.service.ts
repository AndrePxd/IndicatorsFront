import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Indicator} from "./indicator";


@Injectable({
  providedIn: 'root'
})
export class IndicatorService {

  private apiUrl = 'http://localhost:8080/api/indicators';

  constructor(private http: HttpClient) { }

  getIndicators(): Observable<Indicator[]> {
    return this.http.get<Indicator[]>(this.apiUrl);
  }

  createIndicator(indicator: Indicator) {
    return this.http.post(this.apiUrl, indicator);
  }

  updateIndicator(id: number, indicator: Indicator) {
    return this.http.put(`${this.apiUrl}/${id}`, indicator);
  }

  deleteIndicator(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getIndicator(id: number): Observable<Indicator> {
    return this.http.get<Indicator>(`${this.apiUrl}/${id}`);
  }

}
