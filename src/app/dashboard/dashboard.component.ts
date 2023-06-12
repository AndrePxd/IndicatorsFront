import { Component, OnInit } from '@angular/core';
import { IndicatorService } from '../indicator.service';
import { Indicator } from '../indicator';
import { ThemePalette } from '@angular/material/core'; // Importa ThemePalette
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';






@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nameKri: String = "";
  valor1: number = 0;
  valor2: number = 0;
  threshold1: number = 30;
  threshold2: number = 70;
  indicators?: Indicator[];

  constructor(private indicatorService: IndicatorService) {}

  ngOnInit(): void {
    this.indicatorService.getIndicators().subscribe(indicators => {
      this.indicators = indicators; // Asigna los indicadores obtenidos del servicio a la variable indicators
      this.nameKri = indicators[0].nameKri; //Obtén nombre dek primer indicador
      this.valor1 = indicators[0].value1; // Obtén el valor1 del primer indicador
      this.valor2 = indicators[0].value2; // Obtén el valor2 del primer indicador
    });
  }

  getColor(indicator: Indicator): ThemePalette {
    const percentage = this.getPercentage(indicator);
    if (percentage < this.threshold1) {
      return 'warn';
    } else if (percentage < this.threshold2) {
      return 'accent';
    } else {
      return 'primary';
    }
  }

  getPercentage(indicator: Indicator): number {
    return (indicator.value1 / indicator.value2) * 100;
  }
  generatePDF(): void {
    const pdf = new jsPDF();

    const element = document.getElementById('pdfContent');

    if (element) {
      html2canvas(element).then((canvas) => {
        const imageData = canvas.toDataURL('image/png');

        const imgWidth = 210; // Ancho de la imagen en mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Alto de la imagen calculado proporcionalmente

        pdf.addImage(imageData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('dashboard.pdf');
      });
    }
  }

}
