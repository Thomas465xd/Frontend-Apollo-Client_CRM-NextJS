// app/auth/layout.tsx
import Footer from "@/components/ui/Footer";
import type { ReactNode } from "react";

export default function AuthLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
        <>
            <main className="min-h-screen flex items-center justify-center p-6 bg-slate-800">
                <div>
                    {children}
                </div>
            </main>

            <Footer />
        </>
	);
}
