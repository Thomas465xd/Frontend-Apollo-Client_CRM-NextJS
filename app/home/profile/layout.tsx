import Tabs from "@/components/home/profile/Tabs";
import Title from "@/components/ui/Title";
import { ReactNode } from "react";

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<>
            <Title>Your Profile</Title>

			<div className="px-6">
				<Tabs />
			</div>

			<div className="dark:p-6 dark:border dark:border-gray-700 border-gray-400 rounded-lg dark:rounded-lg">
				{children}
			</div>
		</>
	);
}
