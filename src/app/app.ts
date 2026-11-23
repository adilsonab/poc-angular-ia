import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Task, TaskApi } from './task-api';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly taskApi = inject(TaskApi);

  protected readonly tasks = signal<Task[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly isSaving = signal(false);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.taskApi
      .listTasks()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (tasks) => this.tasks.set(tasks),
        error: () => this.error.set('Não foi possível carregar as tarefas. Verifique se o backend está em execução.'),
      });
  }

  protected addTask(input: HTMLInputElement): void {
    const title = input.value.trim();
    if (!title || this.isSaving()) return;

    this.error.set(null);
    this.isSaving.set(true);

    this.taskApi
      .createTask(title)
      .pipe(finalize(() => this.isSaving.set(false)))
      .subscribe({
        next: (task) => {
          this.tasks.update((tasks) => [...tasks, task]);
          input.value = '';
          input.focus();
        },
        error: () => this.error.set('Não foi possível salvar a tarefa. Tente novamente.'),
      });
  }
}
