import { Injectable } from '@angular/core';
import { RestService } from 'src/app/shared/services/rest.service';
import { Categorie } from '../interfaces/parametrages';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorieService  extends RestService<Categorie>{
  protected override uri = 'categories';
 
}
