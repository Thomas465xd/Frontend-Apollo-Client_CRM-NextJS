"use client"

import { redirect } from "next/navigation";
import DarkMode from "../ui/DarkMode"
import SidebarRoute from "./SidebarRoute"
import Swal, { SweetAlertTheme } from "sweetalert2";

const sidebarNavigation = [
    {url: '/home', text: 'Home', blank: false},
    {url: '/home/clients', text: 'Clients', blank: false},
    {url: '/home/products', text: 'Products', blank: false},
    {url: '/home/orders', text: 'Orders', blank: false},
    {url: '/home/analytics', text: 'Analytics', blank: false},
]

export default function Sidebar() {

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?", 
            text: "You won't be able to revert this action!", 
            icon: "warning",
            showCancelButton: true, 
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!",
            theme: `${localStorage.getItem("theme") as SweetAlertTheme}`
        }).then(async (result) => {
            if(result.isConfirmed) {
                localStorage.removeItem('AUTH_TOKEN');
                redirect('/auth/login');
            }
        })
    };

    return (
        <>
            <div className="text-2xl pt-5 pb-2 px-10 border-b-2 border-blue-500 dark:border-gray-600">
                <h1 className="text-white text-center">
                    <span className="text-blue-500 font-semibold">Next</span> CRM
                </h1>
            </div>

            <div className="space-y-3 ">
                <div className="">
                    <p className="mt-10 uppercase font-bold text-sm text-gray-600 text-center">Navigation</p>
                    <nav className="flex flex-col items-center mt-5">
                        {sidebarNavigation.map((link) => (
                            <SidebarRoute
                                key={link.url}
                                link={link}
                            />
                        ))}

                        <div className="">
                            <p className="uppercase font-bold text-sm text-gray-600 text-center pt-5">My Account</p>
                        </div>

                        <SidebarRoute
                            link={{url: '/home/profile', text: 'Profile', blank: false}}
                        />

                        <button
                            className="mt-5 bg-slate-800 hover:bg-slate-900 w-full p-3 text-red-300 font-black text-md cursor-pointer transition-colors duration-300"
                            type="button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                        <div className="fixed bottom-5">
                            <DarkMode />
                        </div>
                    </nav>
                </div>
            </div>
        </>

    )
}