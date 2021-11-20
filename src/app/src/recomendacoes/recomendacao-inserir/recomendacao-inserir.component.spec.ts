import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacaoInserirComponent } from './recomendacao-inserir.component';

describe('RecomendacaoInserirComponent', () => {
  let component: RecomendacaoInserirComponent;
  let fixture: ComponentFixture<RecomendacaoInserirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomendacaoInserirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendacaoInserirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
