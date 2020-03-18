import * as fromRoot from '../../state/app.state';
import { Product } from '../product';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.action';

export interface State extends fromRoot.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
};

export const getProductFeatureState = createFeatureSelector<ProductState>('products');
export const getShowProductCode = createSelector(getProductFeatureState, state => state.showProductCode);
export const getProducts = createSelector(getProductFeatureState, state => state.products);
export const getCurrentProductId = createSelector(getProductFeatureState, state => state.currentProductId);
export const getCurrentProduct = createSelector(getProductFeatureState, getCurrentProductId, (state, currentProductId) => {
    if (currentProductId === 0) {
        return {
            id: 0,
            productName: '',
            productCode: 'New',
            description: '',
            starRating: 0
        };
    }
    return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
});

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);

export function reducer(state = initialState, actions: ProductActions): ProductState {
    // console.log('state ' + JSON.stringify(state));
    // console.log('state ' + actions.payload);
    switch (actions.type) {

        case ProductActionTypes.ToggleProductCode:
            return {
                ...state,
                showProductCode: actions.payload
            };

        case ProductActionTypes.SetCurrentProduct:
            return {
                ...state,
                currentProductId: actions.payload.id
            };

        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProductId: null
            };

        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProductId: 0
            };

        case ProductActionTypes.LoadSuccess:
            return {
                ...state,
                products: actions.payload,
                error: ''
            };

        case ProductActionTypes.LoadFail:
            return {
                ...state,
                products: [],
                error: actions.payload
            };

        case ProductActionTypes.UpdateProductSuccess:
            const updatedProducts = state.products.map(p => p.id === actions.payload.id ? actions.payload : p);
            return {
                ...state,
                products: updatedProducts,
                error: ''
            };

        case ProductActionTypes.UpdateProductFail:
            return {
                ...state,
                error: actions.payload
            };

        case ProductActionTypes.CreateProductSuccess:
            return {
                ...state,
                products: [...state.products, actions.payload],
                currentProductId: actions.payload.id,
                error: ''
            };

        case ProductActionTypes.CreateProductFail:
            return {
                ...state,
                error: actions.payload
            };

        case ProductActionTypes.DeleteProductSuccess:
            return {
                ...state,
                products: state.products.filter(p => p.id !== actions.payload),
                currentProductId: null,
                error: ''
            };

        case ProductActionTypes.DeleteProductFail:
            return {
                ...state,
                error: actions.payload
            };

        default:
            return state;
    }
}
