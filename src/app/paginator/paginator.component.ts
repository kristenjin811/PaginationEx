import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 5;
  currentPage = 1;
  @Output() pageChanged = new EventEmitter<number>();
  pagesToShow = 5;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems() {
    this.httpService.fetchTodos().subscribe(todos => {
      this.totalItems = todos.length;
      this.currentPage = 1; 
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): any[] {
    const totalPageButtonsToShow = 5;
    const halfRangeToShow = Math.floor(totalPageButtonsToShow / 2);
  
    let startPage = this.currentPage - halfRangeToShow;
    let endPage = this.currentPage + halfRangeToShow;
  
    if (startPage < 1) {
      endPage = endPage + (1 - startPage);
      startPage = 1;
    }
  
    if (endPage > this.totalPages) {
      startPage = startPage - (endPage - this.totalPages);
      endPage = this.totalPages;
    }
  
    startPage = Math.max(startPage, 1);
    endPage = Math.min(endPage, this.totalPages);
  
    let pages = [];
  
    if(startPage != 1) {
      pages.push(1);
      pages.push('...');
    }
  
    for(let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  
    if(endPage != this.totalPages) {
      pages.push('...');
      pages.push(this.totalPages);
    }
  
    return pages;
  }
  

  onPageChanged(page: number) {
    this.currentPage = page;
    this.pageChanged.emit(page);
  }
}
