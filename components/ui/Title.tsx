import { ReactNode } from "react";

export default function Title({
	children,
	withoutBorder = false,
}: {
	children: ReactNode;
	withoutBorder?: boolean;
}) {
	return (
		<div
			className={`p-6 m-4 ${
				withoutBorder
					? "border-0"
					: "dark:border dark:border-gray-700 dark:rounded-lg rounded-none border-b-2 border-gray-400"
			}`}
		>
			<h2 className="text-3xl font-bold text-center">{children}</h2>
		</div>
	);
}
