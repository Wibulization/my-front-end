import { Component } from '@angular/core';
import { ReportService } from '../../reportservice/report.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  reportName: string = 'user_report';
  filter: string = '';

  constructor(private reportService: ReportService, private toastr: ToastrService) { }

  downloadPdf() {
    this.reportService.exportPdf(this.reportName, this.filter).subscribe(blob => {
      this.downloadFile(blob, 'application/pdf', 'report.pdf');
      this.toastr.success('Xuất báo cáo PDF thành công!', 'Thành công');
    }, error => {
      //this.toastr.error('Lỗi khi xuất PDF!', 'Lỗi');
    });
  }

  downloadXlsx() {
    this.reportService.exportXlsx(this.reportName, this.filter).subscribe(blob => {
      this.downloadFile(blob, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'report.xlsx');
      this.toastr.success('Xuất báo cáo Excel thành công!', 'Thành công');
    }, error => {
      //this.toastr.error('Lỗi khi xuất Excel!', 'Lỗi');
    });
  }

  private downloadFile(blob: Blob, fileType: string, fileName: string) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }
}
