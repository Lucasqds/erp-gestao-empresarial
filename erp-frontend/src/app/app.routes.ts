import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListarEmpresasComponent } from './features/empresa/listar-empresas/listar-empresas.component';
import { CadastrarEmpresaComponent } from './features/empresa/cadastrar-empresa/cadastrar-empresa.component';
import { ListarFornecedoresComponent } from './features/fornecedor/listar-fornecedores/listar-fornecedores.component';
import { CadastrarFornecedorComponent } from './features/fornecedor/cadastrar-fornecedor/cadastrar-fornecedor.component';
import { DetalheFornecedorComponent } from './features/fornecedor/detalhe-fornecedor/detalhe-fornecedor.component';
import { DetalheEmpresaComponent } from './features/empresa/detalhe-empresa/detalhe-empresa.component';
import { GerenciarEmpresaComponent } from './features/empresa/gerenciar-empresa/gerenciar-empresa.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'empresas', component: ListarEmpresasComponent },
      { path: 'empresas/cadastrar', component: CadastrarEmpresaComponent },
      { path: 'empresas/:id', component: DetalheEmpresaComponent },
      { path: 'empresas/:id/gerenciar', component: GerenciarEmpresaComponent },
      
      { path: 'fornecedores', component: ListarFornecedoresComponent },
      { path: 'fornecedores/cadastrar', component: CadastrarFornecedorComponent },
      { path: 'fornecedores/:id', component: DetalheFornecedorComponent },

      { path: '', redirectTo: 'empresas', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];