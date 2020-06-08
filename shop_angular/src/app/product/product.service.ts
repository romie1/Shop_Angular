import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ProductService
{
    constructor(private httpService:HttpClient){}

    getAllProducts(): Observable<Product[]>
    {
        return this.httpService.get<Product[]>("http://localhost:8080/Shop/api/products")
                                .pipe(
                                    tap( _ => console.log("Get all products")),
                                    catchError(this.handleError<Product[]>('getAllProducts', []))
                                );
    }

    addProduct(product: Product)
    {
        let body = JSON.stringify(product);
        let headers = {headers: new HttpHeaders({'Content-Type':'application/json'})};
        if(product.id)
        {
            return this.httpService.put("http://localhost:8080/Shop/api/products/" + product.id, body, headers);
        } else{
            return this.httpService.post("http://localhost:8080/Shop/api/products", body, headers);
        }
    }

    deleteProduct(productId: String)
    {
        return this.httpService.delete('http://localhost:8080/Shop/api/products/'+ productId);
    }

    getProductById(productId:String): Observable<Product>
    {
        return this.httpService.get<Product>('http://localhost:8080/Shop/api/products/'+ productId)
                                .pipe(
                                    tap(_ => console.log('Get product id=${productId}')),
                                    catchError(this.handleError<Product>('getProductById id=${productId}')) 
                                );
    }

    // Copied from Angular Documentation
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        console.log('${operation} failed: ${error.message}');

        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }
}