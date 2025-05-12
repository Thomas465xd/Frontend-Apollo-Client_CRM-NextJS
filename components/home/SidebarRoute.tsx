"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type RouteProps = {
	link: {
		url: string;
		text: string;
		blank: boolean;
	};
};

export default function SidebarRoute({ link }: RouteProps) {
	const pathname = usePathname();
	const isActive = pathname === link.url;

	return (
		<Link
			className={`
            ${
				isActive
					? "bg-slate-200 dark:bg-slate-900 hover:bg-slate-300 dark:hover:bg-gray-950 border-y border-slate-300 dark:border-gray-700"
					: "hover:bg-slate-100 dark:hover:bg-slate-900"
			}
                font-bold text-md p-3 last-of-type:mb-5 w-full text-center
                text-gray-900 dark:text-white transition-colors duration-300
            `}
			href={link.url}
			target={link.blank ? "_blank" : ""}
		>
			{link.text}
		</Link>
	);
}
