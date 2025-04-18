import { ReactNode } from "react";

export default function Title({children} : {children: ReactNode}) {
    return (
        <div className="p-6 m-4 dark:border dark:border-gray-700 border-b-2 border-gray-400 dark:rounded-lg">
            <h2 className="text-3xl font-bold text-center">{children}</h2>
        </div>
    )
}
