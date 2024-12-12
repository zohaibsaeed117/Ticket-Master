import { redirect, useRouter } from 'next/navigation'
import React from 'react'

const AdminVerify = () => {

    const router = useRouter();
    console.log("This is user", localStorage.getItem("ticket-master-isAdmin"))
    if (localStorage.getItem("ticket-master-isAdmin") !== "true") {
        redirect("/error");
    }
    return (
        <div>
        </div>
    )
}

export default AdminVerify
