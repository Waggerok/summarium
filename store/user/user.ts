import { create } from "zustand";

import { User } from "@/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

export enum LogInErrorType {
    NoLoginMessage = 'Укажите логин',
    NoPasswordMessage = 'Укажите пароль',
    NoDataMessage = 'Укажите логин и пароль',
    IncorrectDataMessage = 'Неверный логин или пароль',
    SsoCallbackError = 'Ошибка авторизации через SSO, попробуйте ещё раз'
}

export enum LoginStatus {
    Unauthorized = 'unauthorized',
    InProgress = 'in_progress',
    Success = 'success',
    Error = 'error'
}

type State = {    
    user : User | null;
    setUser: (user: User | null) => void;

    error: LogInErrorType | null;

    logInStatus : LoginStatus;

    logInSuccess : (user : User | null) => void

    logInError : (error : LogInErrorType | null) => void;

    logInProgress : () => void;

    logout: () => void;    
}

export const useUserStore = create<State>((set) => {
    return {
        user: null,
        error: null,
        logInStatus: LoginStatus.Unauthorized,
        setUser : (user: User | null) => {
            return set(() => {
                return {user, error: null}
            })
        },

        logout: () => {
            AsyncStorage.removeItem('AccessToken');
            return set(() => {
                return {logInStatus: LoginStatus.Unauthorized, user: null}
            })
        },

        logInProgress: () => {
            return set(() => {
                return {logInStatus: LoginStatus.InProgress, error: null}
            })
        },

        logInSuccess: (user: User | null) => {
            return set(() => {
                return {logInStatus: LoginStatus.Success, user, error: null}
            })
        },

        logInError: (error: LogInErrorType | null) => {
            return set(() => {
                return {error , LoginStatus: LoginStatus.Error}
            })
        }
    }
})