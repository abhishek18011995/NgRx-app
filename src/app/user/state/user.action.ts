import { Action } from '@ngrx/store';

export enum UserActionTypes {
    ToggleUsernameMasking = '[User] Toggle Username Masking'
}

export class ToggleUsernameMasking implements Action {
    readonly type = UserActionTypes.ToggleUsernameMasking;

    constructor(public payload: boolean) { }
}

export type UserActions = ToggleUsernameMasking;




