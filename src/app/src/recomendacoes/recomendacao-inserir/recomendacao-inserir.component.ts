import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Recomendacao } from '../recomendacao.model';
import { RecomendacaoService } from '../recomendacao.service';

@Component({
  selector: 'app-recomendacao-inserir',
  templateUrl: './recomendacao-inserir.component.html',
  styleUrls: ['./recomendacao-inserir.component.css']
})
export class RecomendacaoInserirComponent implements OnInit {

  public recomendacao: Recomendacao;
  private modo: string = "criar";
  private idRecomendacao: string;

  constructor(private recomendacaoService: RecomendacaoService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('idRecomendacao')) {
        this.modo = 'editar';
        this.idRecomendacao = paramMap.get('idRecomendacao');
        this.recomendacaoService.getRecomendacao(this.idRecomendacao).subscribe(dadosRecomendacao => {
          this.recomendacao = {
            id: dadosRecomendacao._id,
            texto: dadosRecomendacao.texto,
            data: dadosRecomendacao.data
          }
        });
      } else {
        this.modo = "criar";
        this.idRecomendacao = null;
      }
    })
  }

  onSalvarRecomendacao(form: NgForm) {
    if(form.invalid) return;

    if(this.modo === 'criar') {
      this.recomendacaoService.adicionarRecomendacao(
        form.value.texto
      );
    } else {
      this.recomendacaoService.atualizarRecomendacao(
        this.idRecomendacao,
        form.value.texto,
        this.recomendacao.data
      )
    }
    
    form.resetForm();
  }

}
