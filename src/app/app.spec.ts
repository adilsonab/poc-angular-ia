import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';

describe('Lista de tarefas', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('carrega tarefas do backend e envia novas tarefas após remover espaços extras', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const listRequest = httpTestingController.expectOne('http://localhost:8080/listTasks');
    expect(listRequest.request.method).toBe('GET');
    listRequest.flush([{ id: 1, title: 'Estudar Signals' }]);

    const element = fixture.nativeElement as HTMLElement;
    const input = element.querySelector<HTMLInputElement>('#task')!;
    const form = element.querySelector('form')!;

    input.value = '  Revisar Angular  ';
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    const createRequest = httpTestingController.expectOne('http://localhost:8080/createTask');
    expect(createRequest.request.method).toBe('POST');
    expect(createRequest.request.body).toEqual({ title: 'Revisar Angular' });
    createRequest.flush({ id: 2, title: 'Revisar Angular' });
    fixture.detectChanges();

    expect(element.querySelectorAll('li')).toHaveLength(2);
    expect(element.textContent).toContain('Estudar Signals');
    expect(element.textContent).toContain('Revisar Angular');
    expect(input.value).toBe('');
  });

  it('não envia tarefas vazias ao backend', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpTestingController.expectOne('http://localhost:8080/listTasks').flush([]);

    const element = fixture.nativeElement as HTMLElement;
    const input = element.querySelector<HTMLInputElement>('#task')!;
    const form = element.querySelector('form')!;
    input.value = '   ';
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    httpTestingController.expectNone('http://localhost:8080/createTask');
    expect(element.textContent).toContain('Nenhuma tarefa adicionada.');
  });

  it('mostra erro quando o backend não está disponível', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpTestingController
      .expectOne('http://localhost:8080/listTasks')
      .flush('Falha', { status: 500, statusText: 'Server Error' });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent).toContain(
      'Não foi possível carregar as tarefas.',
    );
  });

});
