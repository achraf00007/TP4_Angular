import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../services/products.service";
import { Product } from "../model/product.model";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  constructor(private productService: ProductsService , private router : Router , public appState : AppStateService ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
/*    this.appState.setProductState({
      status : "LOADING"
    })*/
    this.productService.getProducts(this.appState.productsState.keyword , this.appState.productsState.currentPage, this.appState.productsState.pageSize).subscribe({
      next: (resp: any) => { // Ensure your service is adapted to handle the correct response structure

        let products = resp.body;
        let totalProducts = parseInt(resp.headers.get('x-total-count')!, 10);
        //this.appState.productsState.totalProducts = totalProducts
        let totalPages = Math.floor(totalProducts / this.appState.productsState.pageSize);

        if(totalProducts % this.appState.productsState.pageSize !=0 )
        {
          totalPages = this.appState.productsState.totalPages + 1;
        }
        this.appState.setProductState({
          products : products, totalPages : totalPages ,totalProducts : totalProducts , status : "LOADED"
        })
      },
      error: err => {
        this.appState.setProductState({
          status : "ERROR" ,
          errorMessage : err
        })
      }
    });
  }

  deleteProduct(product: Product): void {
    if (confirm("Are you sure?")) {
      this.productService.delProduct(product).subscribe({
        next: () => {
          //this.appState.productsState.products = this.appState.productsState.products.filter((p :  any) => p.id !== product.id);
            this.getProducts()
        },
        error: err => console.log(err)
      });
    }
  }

  handleCheckProduct(product: Product): void {
    this.productService.checkProduct(product).subscribe({
      next: () => product.checked = !product.checked,
      error: err => console.error(err)
    });
  }

  searchProducts(): void {
    this.appState.productsState.currentPage=1;
    this.appState.productsState.totalPages=0;
    this.productService.SearchProducts(this.appState.productsState.keyword  , this.appState.productsState.pageSize , this.appState.productsState.currentPage).subscribe({

      next: (products) => {
        this.appState.productsState.products = products;
        this.appState.productsState.currentPage = 1;
      },
      error: err => console.error(err)
    });
  }

/*  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProducts();
    }
  }*/


  handleGotoPage(page: number): void {
    console.log(`Navigating to page ${page}`);
    this.appState.productsState.currentPage = page;
    this.getProducts();
  }

  editProduct(product: Product) {
  this.router.navigateByUrl(`/admin/edit-product/${product.id}`)

  }
}
