"use client";
import { ReactNode, useEffect } from "react";
import { Providers } from "../../components/providers/ThemeProvider";
import Sidebar from "@/components/home/Sidebar";
import Footer from "@/components/ui/Footer";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";

const GET_PROFILE = gql`
	query getUser {
		getUser {
			name
		}
	}
`;

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const router = useRouter();
	const { data, loading, error } = useQuery(GET_PROFILE);

	useEffect(() => {
		if (!loading && (!data || error)) {
			router.push("/auth/login");
		}
	}, [loading, data, error, router]);

	if (loading) return <Loader />;

	if (data) return (
		<main>
			<Providers>
				<div className="md:flex min-h-screen">
					{/* Sidebar with Fixed Position on Small Screens */}
					<aside className="md:w-1/5 dark:bg-gray-800 md:sticky md:top-0 md:h-screen border-b-2 border-blue-400 md:border-b-0 md:border-r-2 md:dark:border-gray-700 md:border-blue-500 md:dark:border-r-2">
						<Sidebar />
					</aside>

					{/* Main Content Area containing both content and footer */}
					<div className="flex-1 flex flex-col overflow-x-hidden">
						<div className="flex-1 bg-slate-100 dark:bg-gray-900 p-5 overflow-y-auto">
                            <p className="text-gray-500 text-right"> Welcome: {' '}
                                <span className="font-semibold">{data.getUser.name}</span>
                            </p>

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
