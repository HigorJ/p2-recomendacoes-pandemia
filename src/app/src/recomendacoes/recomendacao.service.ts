import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators'

import { Recomendacao } from './recomendacao.model';

@Injectable({
  providedIn: 'root'
})
export class RecomendacaoService {
  private listaRecomendacoesAtualizada = new Subject<Recomendacao[]> ()
  private recomendacoes: Recomendacao[] = [];

  private url: string = "http://localhost:3000/api/recomendacoes";

  constructor(private httpCliente: HttpClient) { }

  getRecomendacoes() {
    this.httpCliente.get<{recomendacoes: any}>(this.url)
      .pipe(map((dados) => {
        return dados.recomendacoes.map(recomendacao => {
          return {
            id: recomendacao._id,
            texto: recomendacao.texto,
            data: recomendacao.data
          }
        })
      }))
      .subscribe((recomendacoes: Recomendacao[]) => {
        this.recomendacoes = recomendacoes;
        this.listaRecomendacoesAtualizada.next([...this.recomendacoes]);
      });
  }

  getRecomendacao(idRecomendacao: string) {
    return this.httpCliente.get<{_id: string, texto: string, data: Date}>(`${this.url}/${idRecomendacao}`)
  }

  adicionarRecomendacao(texto: string) {
    const recomendacao: Recomendacao = {
      texto
    };

    this.httpCliente.post<{mensagem: string, id: string}>(this.url, recomendacao).subscribe();
  }

  atualizarRecomendacao(id, texto, data) {
    const recomendacao: Recomendacao = {
      id,
      texto,
      data
    };

    this.httpCliente.put(`${this.url}/${id}`, recomendacao)
      .subscribe(response => {
        const copia = [...this.recomendacoes];
        const indice = copia.findIndex(re => re.id === recomendacao.id);
        
        copia[indice] = recomendacao;

        this.recomendacoes = copia;
        this.listaRecomendacoesAtualizada.next([...this.recomendacoes]);
      })
  }

  removerRecomendacao(id: string) {
    this.httpCliente.delete(`${this.url}/${id}`)
      .subscribe(() => {
        this.recomendacoes = this.recomendacoes.filter(recomendacao => recomendacao.id !== id);
        this.listaRecomendacoesAtualizada.next([...this.recomendacoes]);
      });
  }

  getListaRecomendacoesAtualizada(): Observable<Recomendacao[]> {
    return this.listaRecomendacoesAtualizada.asObservable();
  }
}
