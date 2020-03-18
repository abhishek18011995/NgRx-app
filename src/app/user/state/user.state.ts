import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.action';

export interface UserState {
    maskUserName: boolean;
}

const initialValues: UserState = {
    maskUserName: false
};

export const getUserFeatureState = createFeatureSelector<UserState>('user');
export const getMaskUserName = createSelector(getUserFeatureState, state => state.maskUserName);

export function reducer(state = initialValues, actions: UserActions): UserState {
    switch (actions.type) {
        case UserActionTypes.ToggleUsernameMasking:
            return {
                ...state,
                maskUserName: actions.payload
            };

        default:
            return state;
    }
}
