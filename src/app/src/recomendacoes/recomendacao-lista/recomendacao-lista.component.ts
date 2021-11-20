import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recomendacao } from '../recomendacao.model';
import { RecomendacaoService } from '../recomendacao.service';

@Component({
  selector: 'app-recomendacao-lista',
  templateUrl: './recomendacao-lista.component.html',
  styleUrls: ['./recomendacao-lista.component.css']
})
export class RecomendacaoListaComponent implements OnInit, OnDestroy {
  recomendacoes: Recomendacao[] = [];
  private recomendacaoSubscription: Subscription;

  constructor(private recomendacaoService: RecomendacaoService) { }

  ngOnInit(): void {
    this.recomendacaoService.getRecomendacoes();

    this.recomendacaoSubscription = this.recomendacaoService.getListaRecomendacoesAtualizada()
      .subscribe((recomendacoes: Recomendacao[]) => {
        this.recomendacoes = recomendacoes;
      });
  }

  ngOnDestroy(): void {
    this.recomendacaoSubscription.unsubscribe();
  }

  onDelete(id: string) {
    this.recomendacaoService.removerRecomendacao(id);
  }

}
