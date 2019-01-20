import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class IndicatorProvider {
    private path = 'indicators/';

    constructor(private httpClient: HttpClient) { }

    getIndicators(): Observable<any> {
        return this.httpClient.get(environment.apiBaseUrl);
    }

    getIndicator(key: string): Observable<any> {
        return this.httpClient.get(environment.apiBaseUrl + this.path + key);
    }

    addIndicator(body: any): Observable<any> {
        return this.httpClient.post(environment.apiBaseUrl + this.path, body); 
    }
}