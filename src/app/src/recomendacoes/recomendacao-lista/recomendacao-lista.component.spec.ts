import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacaoListaComponent } from './recomendacao-lista.component';

describe('RecomendacaoListaComponent', () => {
  let component: RecomendacaoListaComponent;
  let fixture: ComponentFixture<RecomendacaoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomendacaoListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendacaoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
