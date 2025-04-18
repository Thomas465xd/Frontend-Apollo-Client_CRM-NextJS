"use client";

import { Fingerprint, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ChangeEvent } from "react";

const tabs = [
    { name: "My Profile", href: "/home/profile", icon: UserIcon },
    {
        name: "Change Password",
        href: "/home/profile/password",
        icon: Fingerprint,
    },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
    const pathname = usePathname();
    const router = useRouter();

    const currentTab =
        tabs.find((tab) => tab.href === pathname)?.href || tabs[0].href;

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        router.push(e.target.value);
    };

    return (
        <div className="mb-10">
            {/* Mobile Dropdown */}
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Selecciona una pestaña
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    onChange={handleSelectChange}
                    value={currentTab}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name} value={tab.href}>
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Desktop Tabs */}
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    pathname === tab.href
                                        ? "border-blue-500 text-blue-500"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                    "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                                )}
                            >
                                <tab.icon
                                    className={classNames(
                                        pathname === tab.href
                                            ? "text-blue-500"
                                            : "text-gray-400 group-hover:text-gray-500",
                                        "-ml-0.5 mr-2 h-5 w-5"
                                    )}
                                    aria-hidden="true"
                                />
                                <span>{tab.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
