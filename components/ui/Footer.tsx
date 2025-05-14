'use client';
import { useEffect, useState } from 'react';

type FooterProps = {
    dark?: boolean; 
}

export default function Footer({ dark }: FooterProps) {
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className={`${dark ? "bg-gray-900 border-t-2 border-gray-700" : "bg-gray-100 border-gray-300 dark:bg-gray-900 border-t-2 dark:border-gray-700"} flex justify-between`}>
            <p className={`text-center p-4 ${dark ? "text-gray-400" : "text-gray-700 dark:text-gray-400"}`}>
                Client CRM Next - Copyright &copy; {year ?? '----'}
            </p>
            <p className={`text-center p-4 ${dark ? "text-gray-400" : "text-gray-700 dark:text-gray-400"} text-sm`}>
                Developed by{' '}
                <a
                    className={`${dark ? "text-gray-400 hover:text-gray-300" : "hover:text-gray-900 dark:hover:text-gray-500 "} font-semibold transition-colors duration-200`}
                    href="https://github.com/Thomas465xd"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Thomas Schrödinger GitHub Profile"
                >
                    Thomas Schrödinger
                </a>
            </p>
        </footer>
    );
}
