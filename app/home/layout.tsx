import { ReactNode } from "react";
import { Providers } from "../providers";
import Sidebar from "@/components/home/Sidebar";

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
    return (
        <main>
            <Providers>
                <div className="md:flex min-h-screen">
                    {/* Sidebar with Fixed Position on Small Screens */}
                    <aside 
                        className="md:w-72 xl:w-1/5 bg-gray-800 md:sticky md:top-0 md:h-screen border-b-2 border-gray-700 md:border-b-0 md:border-r-4 md:dark:border-gray-700 md:border-slate-500 md:dark:border-r-2"
                    >
                        <Sidebar />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 h-screen overflow-y-scroll bg-slate-300 dark:bg-gray-900 p-5 pb-96 md:pb-5">
                        {children}
                    </main>
                </div>
            </Providers>
        </main>
	);
}
