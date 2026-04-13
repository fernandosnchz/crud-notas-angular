import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotasService } from '../../services/notas.service';
imports: [ReactiveFormsModule, CommonModule],

@Component({
  selector: 'app-crear-nota',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-nota.component.html',
  styleUrl: './crear-nota.component.scss'
})
export class CrearNotaComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notasService: NotasService,
    private router: Router
  ) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      contenido: ['', Validators.required]
    });
  }

  guardar(): void {
    if (this.form.invalid) return;
    const { titulo, contenido } = this.form.value;
    this.notasService.create(titulo, contenido);
    this.router.navigate(['/notas']);
  }

  cancelar(): void {
    this.router.navigate(['/notas']);
  }
}
