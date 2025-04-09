import React, { ReactNode } from 'react'

export default function Header({children} : {children: ReactNode}) {
    return (
        <div className="">
            <h1 className="text-3xl font-bold">
                {children}
            </h1>
        </div>
    )
}
