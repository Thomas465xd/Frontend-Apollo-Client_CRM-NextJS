import Footer from "@/components/ui/Footer";
import type { ReactNode } from "react";

export default function AuthLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
        <>
            <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 relative overflow-hidden">
                {/* Darker slate overlay */}
                <div className="absolute inset-0 bg-slate-900/40"></div>
                
                {/* Blue accent - much more subtle */}
                <div className="absolute bottom-0 right-0 w-full h-full bg-blue-900 rounded-full blur-3xl opacity-10 mix-blend-overlay"></div>
                
                {/* Very subtle white highlight */}
                <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl opacity-3"></div>
                
                {/* Content container */}
                <div className="relative z-10">
                    {children}
                </div>
            </main>

            <Footer dark />
        </>
	);
}