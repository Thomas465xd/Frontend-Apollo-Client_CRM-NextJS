import DarkMode from "./ui/DarkMode"
import Logo from "./ui/Logo"

export default function Sidebar() {

    return (
        <>
            <Logo />
            <div className="space-y-3 ">
                <p className="mt-10 uppercase font-bold text-sm text-gray-600 text-center">Navigation</p>
                <nav className="flex flex-col items-center space-y-2 mt-5">
                    <DarkMode />
                </nav>
            </div>
        </>

    )
}