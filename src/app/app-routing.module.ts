import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"
import { RecomendacaoInserirComponent } from "./src/recomendacoes/recomendacao-inserir/recomendacao-inserir.component";
import { RecomendacaoListaComponent } from "./src/recomendacoes/recomendacao-lista/recomendacao-lista.component";

const routes: Routes = [
    {
        path: '', 
        component: RecomendacaoListaComponent
    },
    {
        path: 'criar', 
        component: RecomendacaoInserirComponent
    },
    {
        path: 'editar/:idRecomendacao', 
        component: RecomendacaoInserirComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{

}