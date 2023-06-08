import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/user/data/services/category.service';
import { Category } from 'src/app/user/data/types/category';

@Component({
  selector: 'app-view-category-details',
  templateUrl: './view-category-details.component.html',
  styleUrls: ['./view-category-details.component.sass']
})
export class ViewCategoryDetailsComponent implements OnInit {
  category: Category;

  constructor( @Inject(MAT_DIALOG_DATA) public data,
  private fb: FormBuilder,
  private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.category = this.data.data;

    console.log(this.category)
  }

}
