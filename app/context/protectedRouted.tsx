'use client';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingPage from "../components/LoadingPage";
import { useContextData } from '@/app/context/contextAuth';

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { userInfo, loading } = useContextData();

    useEffect(() => {
        if (!loading && userInfo === null) {
            router.replace('/auth');
        }
    }, [loading, userInfo, router]);

    if (loading) {
        return <LoadingPage />;
    }

    return userInfo ? <>{children}</> : <LoadingPage />;
}