import DarkMode from "../ui/DarkMode"
import SidebarRoute from "./SidebarRoute"

const sidebarNavigation = [
    {url: '/home', text: 'Home', blank: false},
    {url: '/home/orders', text: 'Orders', blank: false},
    {url: '/home/products', text: 'Products', blank: false},
    {url: '/home/clients', text: 'See Clients', blank: false},
]

export default function Sidebar() {

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
                            <p className="uppercase font-bold text-sm text-gray-600 text-center">My Account</p>
                        </div>

                        <div className="fixed bottom-5">
                            <DarkMode />
                        </div>
                    </nav>
                </div>
            </div>
        </>

    )
}