import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IndicatorService} from "../indicator.service";
import {Indicator} from "../indicator";

@Component({
  selector: 'app-editar-indicador',
  templateUrl: './editar-indicador.component.html',
  styleUrls: ['./editar-indicador.component.css']
})
export class EditarIndicadorComponent {
  indicator: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private indicadorService: IndicatorService,



  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convertir el id a número
      console.log(id);

      // Obtener el indicador desde el servicio
      this.indicadorService.getIndicator(id).subscribe(indicator => {
        this.indicator = indicator;
      });
    });
  }

  updateIndicator(): void {
    this.indicadorService.updateIndicator(this.indicator.idKri, this.indicator).subscribe(
      () => {
        this.getIndicators();
      },
      error => {
        console.error('Error updating indicator', error);
      }
    );
  }
  getIndicators(): void {
    this.indicadorService.getIndicators().subscribe(
      (data: Indicator[]) => {
        this.indicator = data;
      },
      error => {
        console.error('Error fetching indicators', error);
      }
    );
  }


}
