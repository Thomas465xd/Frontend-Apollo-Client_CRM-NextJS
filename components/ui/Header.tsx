import { ReactNode } from "react";

interface HeaderProps {
	children: ReactNode;
	white?: boolean;
    xl?: boolean;
    left?: boolean;
}

export default function Header({ children, white = false, xl=false, left=false }: HeaderProps) {
	return (
		<div>
			<h1
				className={`font-bold text-center ${
					white ? "text-white" : "text-black"
				} ${
                    xl ? "text-4xl" : "text-3xl"
                } ${
                    left ? "text-left" : "text-center"    
                }`}
			>
				{children}
			</h1>
		</div>
	);
}
