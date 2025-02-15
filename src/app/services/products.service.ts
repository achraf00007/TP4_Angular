import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private host='http://localhost:3000'

  constructor(private http: HttpClient) {
  }

  public getProducts(keyword: string = "", page: number = 0, size: number = 5) {
    return this.http.get(
      `${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`, {observe: "response"}
    )
  }

  public checkProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.host}/products/${product.id}`,
      {checked: !product.checked})
  }

  public delProduct(product: Product) {
    return this.http.delete<any>(`${this.host}/products/${product.id}`);
  }


  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.host}/products`, product)

  }


  public SearchProducts(keyword: string, page: number, size: number): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      `${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`)
  }


  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.host}/products/${productId}`);
  }

  updateproduct(product: Product) : Observable<Product> {
    return this.http.put<Product>(`${this.host}/products/${product.id}`, product);

  }
}
