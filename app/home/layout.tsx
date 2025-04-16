import { ReactNode } from "react";
import { Providers } from "../providers";
import Sidebar from "@/components/home/Sidebar";
import Footer from "@/components/ui/Footer";

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
                        className="md:w-72 xl:w-1/5 bg-gray-800 md:sticky md:top-0 md:h-screen border-b-2 border-gray-700 md:border-b-0 md:border-r-2 md:dark:border-gray-700 md:border-gray-600 md:dark:border-r-2"
                    >
                        <Sidebar />
                    </aside>

                    {/* Main Content Area containing both content and footer */}
                    <div className="flex-1 flex flex-col">
                        {/* Content */}
                        <div className="flex-1 bg-slate-300 dark:bg-gray-900 p-5 overflow-y-auto">
                            {children}
                        </div>
                        
                        {/* Footer */}
                        <Footer />
                    </div>
                </div>
            </Providers>
        </main>
    );
}