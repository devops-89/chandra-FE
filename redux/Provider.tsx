'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';

import { AuthControllers } from '@/api/authControllers';
import type { User } from '@/types/auth.types';

import { setCredentials } from './slices/authSlice';
import { store } from './store';

/**
 * Hydrates Redux auth state from API using the stored access token.
 * Fixes the server-side initialization issue where isAuthenticated is always false.
 */
function AuthHydrator({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const hydrate = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');

                if (accessToken) {
                    // Fetch fresh profile from API
                    const profileRes = await AuthControllers.getProfile();
                    const profileData = profileRes.data;

                    dispatch(
                        setCredentials({
                            user: profileData as unknown as User,
                            accessToken,
                            refreshToken: refreshToken || '',
                        })
                    );
                }
            } catch {
                // Token is likely invalid or expired
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                // Trigger a re-render or let the apps recognize token is gone
                window.dispatchEvent(new Event('storage'));
            }
        };

        hydrate();
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
