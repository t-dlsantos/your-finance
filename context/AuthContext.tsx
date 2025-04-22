import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { createIconSetFromFontello } from '@expo/vector-icons';

interface AuthProps {
    authState?: { 
        token: string | null; 
        authenticated: boolean | null;
        isLoading: boolean;
    };
    onRegister?: (email: string, password: string, username: string, userType: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

export const ACCESS_TOKEN_KEY = 'access-token-yourfinance';
export const REFRESH_TOKEN_KEY = 'refresh-token-yourfinance';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const AuthContext = createContext<AuthProps>({});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}: any) {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
        isLoading: boolean;
    }>({
        token: null,
        authenticated: null,
        isLoading: true
    });

    useEffect(() => {
        async function loadToken() {
            const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
            
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuthState({
                    token: token,
                    authenticated: true,
                    isLoading: false
                });
            } else {
                setAuthState({
                    token: null,
                    authenticated: false,
                    isLoading: false
                });
            }
        }
        loadToken();
    }, [])

    async function register(email: string, password: string, username: string, userType: string) {
        try {
            return await axios.post(`${API_URL}/users/`, { 
                email, 
                password,
                username,
                user_type: userType
            });
        } catch (e) {
            return { error: true, msg: (e as any).response.data.msg };
        }
    }

    async function login(username: string, password: string) {
        try {
            const result = await axios.post(`${API_URL}/token/`, { username, password });
            
            setAuthState({
                token: result.data.access,
                authenticated: true,
                isLoading: false
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access}`;
            
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, result.data.access);
            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, result.data.refresh);
            
            return result;
        } catch (e) {
            return { error: true, msg: (e as any).response.data.msg };
        }
    }

    async function logout() {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false,
            isLoading: false
        });
    }
    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}