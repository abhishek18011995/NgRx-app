import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Product } from '../product';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.action';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  isComponentActive = true;
  displayCode = false;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromProduct.State>) { }

  ngOnInit(): void {

    this.store.pipe(select(fromProduct.getProducts), takeWhile(() => this.isComponentActive)).subscribe(products => {
      this.products = products;
    });

    this.store.pipe(select(fromProduct.getCurrentProduct), takeWhile(() => this.isComponentActive)).subscribe(selectedProduct => {
      this.selectedProduct = selectedProduct;
    });

    this.store.pipe(select(fromProduct.getShowProductCode), takeWhile(() => this.isComponentActive)).subscribe(showProductCode => {
      this.displayCode = showProductCode;
    });

    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));

    this.store.dispatch(new productActions.Load());
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
