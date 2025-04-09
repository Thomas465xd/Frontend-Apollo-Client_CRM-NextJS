// app/auth/layout.tsx
import type { ReactNode } from "react";

export default function AuthLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
        <main className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                {children}
            </div>
        </main>
	);
}
