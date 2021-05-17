import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { CategoriesService } from '../../core/services/categories.service';
import { CategoryModel } from '../../core/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  private categories: Array<CategoryModel>;

  constructor(private spinner: NgxSpinnerService, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.spinner.show();

    this.categoriesService.getAllCategories().subscribe(data => {
      this.categories = data;
      this.spinner.hide();
    }, error => {
      console.error(error);
      this.spinner.hide();
    });
  }
}
