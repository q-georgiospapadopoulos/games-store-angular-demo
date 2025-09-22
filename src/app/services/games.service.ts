import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GamesService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  search(query: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/search`, query);
  }

  getFields(): Observable<{ fieldCount: number; fields: string[] }> {
    return this.http.get<{ fieldCount: number; fields: string[] }>(
      `${this.baseUrl}/mappings`
    );
  }
}
