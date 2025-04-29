import { ReactNode } from "react";

export default function Dialog({ children }: { children: ReactNode }) {
    return (
        <span className="absolute left-3 -top-3 bg-gray-600 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            {children}
        </span>
    )
}
