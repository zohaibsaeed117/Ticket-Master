import { useRouter } from 'next/navigation'
import React from 'react'

const AdminVerify = () => {

    const router = useRouter();
    console.log("This is user", localStorage.getItem("ticket-master-isAdmin"))
    if (localStorage.getItem("ticket-master-isAdmin") !== "true") {
        router.push('/error')
        return
    }
    return (
        <div>
        </div>
    )
}

export default AdminVerify
