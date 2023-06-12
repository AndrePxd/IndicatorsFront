import { Component, OnInit } from '@angular/core';
import { IndicatorService } from '../indicator.service';
import {Indicator} from "../indicator";



@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.css']
})
export class IndicatorsComponent implements OnInit {

  indicators: Indicator[] = [];
  newIndicator: Indicator = { nameKri: '', value1: 0, value2:0 };

  constructor(private indicatorService: IndicatorService) { }

  ngOnInit(): void {
    this.getIndicators(); // Llama a getIndicators() en ngOnInit() para obtener los indicadores al iniciar el componente
  }

  getIndicators(): void {
    this.indicatorService.getIndicators().subscribe(
      (data: Indicator[]) => {
        this.indicators = data;
      },
      error => {
        console.error('Error fetching indicators', error);
      }
    );
  }
  addIndicator(): void {
    this.indicatorService.createIndicator(this.newIndicator).subscribe(
      (indicator: any) => {
        this.indicators.push(indicator);
        this.newIndicator = { nameKri: '', value1: 0, value2: 0 };
      },
      (error: any) => {
        console.error('Error creating indicator', error);
      }
    );
  }




  updateIndicator(id: number, updatedIndicator: Indicator): void {
    this.indicatorService.updateIndicator(id, updatedIndicator).subscribe(
      () => {
        this.getIndicators();
      },
      error => {
        console.error('Error updating indicator', error);
      }
    );
  }

  deleteIndicator(id: number): void {
    this.indicatorService.deleteIndicator(id).subscribe(
      () => {
        this.indicators = this.indicators.filter(indicator => indicator.idKri !== id);
      },
      error => {
        console.error('Error deleting indicator', error);
      }
    );
  }
}
