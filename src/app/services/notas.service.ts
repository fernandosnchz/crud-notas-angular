import { Injectable } from '@angular/core';
import { Nota } from '../models/nota.model';

@Injectable({ providedIn: 'root' })
export class NotasService {
  private KEY = 'crud-notas';

  getAll(): Nota[] {
    const data = localStorage.getItem(this.KEY);
    return data ? JSON.parse(data) : [];
  }

  getById(id: string): Nota | undefined {
    return this.getAll().find(n => n.id === id);
  }

  create(titulo: string, contenido: string): void {
    const notas = this.getAll();
    const nueva: Nota = {
      id: crypto.randomUUID(),
      titulo,
      contenido,
      fecha: new Date()
    };
    notas.push(nueva);
    this.save(notas);
  }

  update(id: string, titulo: string, contenido: string): void {
    const notas = this.getAll().map(n =>
      n.id === id ? { ...n, titulo, contenido } : n
    );
    this.save(notas);
  }

  delete(id: string): void {
    const notas = this.getAll().filter(n => n.id !== id);
    this.save(notas);
  }

  private save(notas: Nota[]): void {
    localStorage.setItem(this.KEY, JSON.stringify(notas));
  }
}
