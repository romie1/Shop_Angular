import {Component, OnInit} from '@angular/core';
import {Product} from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']

})
export class ProductComponent implements OnInit
{
    products: Product[];
    product = new Product();

    constructor(private productService: ProductService){}

    ngOnInit():void{
        this.getProducts();
    }

    getProducts():void
    {
        this.productService.getAllProducts()
                            .subscribe((products) => {this.products = products, console.log(products)},
                                        (error) => {console.log(error)} 
                            );
    }

    addProduct():void
    {
        this.productService.addProduct(this.product)
                            .subscribe((response) => {console.log(response);
                                                    this.reset();
                                                    this.getProducts();
                                                    },
                                        (error) => {console.log(error)});
    }
    deleteProduct(productId:String){
        this.productService.deleteProduct(productId)
                        .subscribe((response) => {console.log(response);
                                                this.getProducts();
                                            }),
                                    (error: any) => {console.log(error)};
    }

    getProductById(productId:String)
    {
        this.productService.getProductById(productId)
                        .subscribe((product) => {this.product = product; 
                                            this.getProducts();
                                            console.log(product);
                                        },
                        (error) => console.log(error));   
    }

    private reset()
    {
        this.product.id=null;
        this.product.name=null;
        this.product.category=null;
        this.product.description=null;
        this.product.price=null;
    }
}