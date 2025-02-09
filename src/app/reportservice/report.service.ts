import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private api = 'http://localhost:8081/reports'

  constructor(private http: HttpClient) { }

  // Xuất báo cáo PDF
  exportPdf(reportName: string, filter?: string): Observable<Blob> {
    let params = new HttpParams().set('reportName', reportName);
    if (filter) {
      params = params.set('filter', filter);
    }
    return this.http.get(`${this.api}/export/pdf`, { params, responseType: 'blob' });
  }

  // Xuất báo cáo XLSX
  exportXlsx(reportName: string, filter?: string): Observable<Blob> {
    let params = new HttpParams().set('reportName', reportName);
    if (filter) {
      params = params.set('filter', filter);
    }
    return this.http.get(`${this.api}/export/xlsx`, { params, responseType: 'blob' });
  }
}
