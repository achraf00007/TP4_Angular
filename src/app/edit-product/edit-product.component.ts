import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../services/products.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  productId!: number
  productFormGroup!: FormGroup

  constructor(private activatedRoute: ActivatedRoute,
              private productsService: ProductsService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params["id"];
    this.productsService.getProductById(this.productId).subscribe(
      {
        next: (product) => {
          this.productFormGroup = this.formBuilder.group({
            id : this.formBuilder.control(product.id) ,
            name : this.formBuilder.control(product.name),
            checked :this.formBuilder.control(product.checked) ,
            price : this.formBuilder.control(product.price)
          })

        },
        error: err => console.log(err)
      }
    )
  }

  updateProduct() {
    let product : Product = this.productFormGroup.value;
this.productsService.updateproduct(product).subscribe(
  {
    next : value => {
      alert("Update Done for product with ID : "+ value.id + "   ヾ(＠⌒ー⌒＠)ノ")
    }
  }
)
  }
}
