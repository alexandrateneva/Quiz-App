import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '../models/category.model';
import { GlobalConstants } from '../../global-constants';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getAllCategories() {
    return this.http.get<CategoryModel[]>(this.baseUrl + GlobalConstants.GET_ALL_CATEGORIES_URL);
  }
}
