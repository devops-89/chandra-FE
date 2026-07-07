'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';

import { store } from './store';
import { setCredentials } from './slices/authSlice';
import type { User } from '@/types/auth.types';

/**
 * Hydrates Redux auth state from localStorage on the client.
 * Fixes the server-side initialization issue where isAuthenticated is always false.
 */
function AuthHydrator({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            const userStr = localStorage.getItem('user');
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (userStr && accessToken) {
                const user = JSON.parse(userStr) as User;
                dispatch(
                    setCredentials({
                        user,
                        accessToken,
                        refreshToken: refreshToken || '',
                    })
                );
            }
        } catch {
            // Silently ignore if localStorage is corrupted
        }
    }, [dispatch]);

    return <>{children}</>;
}

export default function ReduxProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            <AuthHydrator>{children}</AuthHydrator>
        </Provider>
    );
}