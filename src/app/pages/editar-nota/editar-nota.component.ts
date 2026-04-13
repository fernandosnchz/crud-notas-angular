import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotasService } from '../../services/notas.service';

@Component({
  selector: 'app-editar-nota',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-nota.component.html'
})
export class EditarNotaComponent implements OnInit {
  form: FormGroup;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private notasService: NotasService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      contenido: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    const nota = this.notasService.getById(this.id);
    if (nota) {
      this.form.setValue({ titulo: nota.titulo, contenido: nota.contenido });
    } else {
      this.router.navigate(['/notas']);
    }
  }

  guardar(): void {
    if (this.form.invalid) return;
    const { titulo, contenido } = this.form.value;
    this.notasService.update(this.id, titulo, contenido);
    this.router.navigate(['/notas']);
  }

  cancelar(): void {
    this.router.navigate(['/notas']);
  }
}
