import DarkMode from "../ui/DarkMode"
import Logo from "../ui/Logo"
import SidebarRoute from "./SidebarRoute"

const sidebarNavigation = [
    {url: '/', text: 'Home', blank: false},
    {url: '/orders', text: 'Orders', blank: false},
    {url: '/products', text: 'Products', blank: false},
    {url: '/clients', text: 'See Clients', blank: false},
]

export default function Sidebar() {

    return (
        <>
            <Logo />
            <div className="space-y-3 ">
                <p className="mt-10 uppercase font-bold text-sm text-gray-600 text-center">Navigation</p>
                <nav className="flex flex-col items-center mt-5">
                    {sidebarNavigation.map((link) => (
                        <SidebarRoute
                            key={link.url}
                            link={link}
                        />
                    ))}
                </nav>

                <DarkMode />
            </div>
        </>

    )
}