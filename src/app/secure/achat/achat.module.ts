import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AchatRoutingModule } from './achat-routing.module';
import { AchatComponent } from './achat.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategorieService } from '../shared/services/categorie.service';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AchatComponent,
    CategoriesComponent,

  ],
  imports: [
    CommonModule,
    AchatRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CategorieService]
})
export class AchatModule { }
