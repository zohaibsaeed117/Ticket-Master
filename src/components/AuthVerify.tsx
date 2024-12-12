"use client"
import { useUserStore } from '@/store/Store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const AuthVerify = () => {
    const Router = useRouter();
    const { setUser, setIsAuthorized } = useUserStore();
    const authorizeUser = async () => {
        try {
            const token = localStorage.getItem('ticket-master-token');
            if (!token) {
                Router.replace('/login');
                return false;
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify `, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                return Router.replace('/login');
            }
            const data = await res.json();
            setIsAuthorized(data.success)
            setUser(data.user)
        } catch (error) {
            Router.replace('/login');
            console.error('Error authorizing user:', error);
            return false;
        }
    }
    useEffect(() => {
        authorizeUser();
    }, [])
    return (
        <React.Fragment>

        </React.Fragment>
    )
}

export default AuthVerify
