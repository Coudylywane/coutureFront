import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestResponse } from '../interfaces/rest-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class RestService<T> {
  protected abstract uri: string;
  constructor(private _http: HttpClient) {}

  all(page: number, perPage: number): Observable<RestResponse<T>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('perPage', perPage.toString());
  
    return this._http.get<RestResponse<T>>(`http://localhost:8000/api/${this.uri}`, { params });
  }

  create(data:T): Observable<RestResponse<T>>{
    return this._http.post<RestResponse<T>>(`http://localhost:8000/api/${this.uri}`,data);

  }

  update(id:number , data:T): Observable<RestResponse<T>>{
    return this._http.post<RestResponse<T>>(`http://localhost:8000/api/${this.uri}/${id}`,data);
  }

  remove(id:number): Observable<RestResponse<T>>{
    return this._http.delete<RestResponse<T>>(`http://localhost:8000/api/${this.uri}/${id}`);

  }

  getUnitesForCategorie(categorieId: number) {
    return this._http.get(`http://localhost:8000/api/categories/${categorieId}/unites`);
  }



}
