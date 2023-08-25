import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecureComponent } from './secure.component';

const routes: Routes = [
  {
      //Charge le composant
    path: '', component: SecureComponent ,
    children: [
      {
        path: 'achat',
        loadChildren: () =>
        import('./achat/achat.module').then(
         (m) => m.AchatModule
        )
      }
    ]
  }

]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
