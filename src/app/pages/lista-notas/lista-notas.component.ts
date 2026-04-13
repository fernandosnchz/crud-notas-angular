import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotasService } from '../../services/notas.service';
import { Nota } from '../../models/nota.model';

@Component({
  selector: 'app-lista-notas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-notas.component.html'
})
export class ListaNotasComponent implements OnInit {
  notas: Nota[] = [];

  constructor(private notasService: NotasService, private router: Router) {}

  ngOnInit(): void {
    this.notas = this.notasService.getAll();
  }

  editar(id: string): void {
    this.router.navigate(['/editar', id]);
  }

  eliminar(id: string): void {
    this.notasService.delete(id);
    this.notas = this.notasService.getAll();
  }

  nueva(): void {
    this.router.navigate(['/crear']);
  }
}
