"use client"
import AdminVerify from '@/components/AdminVerify';
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
    const router = useRouter();
    router.push("/admin/dashboard")
    return (
        <div>
            Loading...
        </div>
    )
}

export default Page
