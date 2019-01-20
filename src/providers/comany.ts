import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class CompanyProvider {
    private path = 'companies/';

    constructor(private httpClient: HttpClient) { }

    getCompanies(): Observable<any> {
        return this.httpClient.get(environment.apiBaseUrl + this.path);
    }

    getCompany(key: string): Observable<any> {
        return this.httpClient.get(environment.apiBaseUrl + this.path + key);
    }

    getIndicators(key: string): Observable<any> {
        return this.httpClient.get(environment.apiBaseUrl + this.path + key + "/indicators");
    }

    getLastestIndicator(key: string): Observable<any> {
        return this.httpClient.get(environment.apiBaseUrl + this.path + key + "/latest-indicator");
    }

    addCompany(body: any): Observable<any> {
        return this.httpClient.post(environment.apiBaseUrl + this.path, body);
    }
}