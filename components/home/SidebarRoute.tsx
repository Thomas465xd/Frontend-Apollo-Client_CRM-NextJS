"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

type RouteProps = {
    link: {
        url: string, 
        text: string, 
        blank: boolean
    }
}

export default function SidebarRoute({link} : RouteProps) {

    const pathname = usePathname();
    const isActive = pathname === link.url;

    return (
        <Link
            className={`${isActive && "bg-slate-900 hover:bg-gray-950 transition-colors border-y border-gray-700"} hover:bg-slate-900 font-bold text-md p-3 last-of-type:mb-5 border-slate-700 w-full text-center text-white transition-colorrs duration-300`}
            href={link.url}
            target={link.blank ? "_blank" : ""}
        >
            {link.text}
        </Link>
    )
}