import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../services/products.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
  public productForm!:FormGroup

  constructor(private fb : FormBuilder , private productsService : ProductsService) {}

  ngOnInit(): void {

    this.productForm = this.fb.group({
      name: this.fb.control('' , [Validators.required]), // initially empty string
      price: this.fb.control(0 , [Validators.required]), // initially empty string
      checked: this.fb.control(false) // initially false
    });
  }

  saveProduct() {
    let product:Product = this.productForm.value;
    this.productsService.saveProduct(product).subscribe(
      {
        next: data => {
          alert(JSON. stringify(data));
        },
        error: err => {console.log(err)}

      }
    )
  }


}
