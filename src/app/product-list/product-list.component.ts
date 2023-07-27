import { Component } from '@angular/core';
import { HttpService } from '../paginator/http.service';
import { products } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = [...products];

  todos: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems() {
    this.httpService.fetchTodos().subscribe(todos => {
      this.todos = todos.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
    });
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.fetchItems();
  }
}

