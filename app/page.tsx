"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeTest() {
	const [mounted, setMounted] = useState(false);
	const [isHtmlDark, setIsHtmlDark] = useState(false);
	const { theme, resolvedTheme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);

		// Function to check if the HTML element has the 'dark' class
		const checkDarkClass = () => {
			const hasDarkClass =
				document.documentElement.classList.contains("dark");
			setIsHtmlDark(hasDarkClass);
		};

		// Check immediately
		checkDarkClass();

		// Set up an observer to watch for class changes on the HTML element
		const observer = new MutationObserver(() => {
			checkDarkClass();
		});

		observer.observe(document.documentElement, { attributes: true });

		return () => observer.disconnect();
	}, []);

	const toggleTheme = () => {
		const newTheme = resolvedTheme === "dark" ? "light" : "dark";
		setTheme(newTheme);

		// Force the class to be applied/removed
		if (newTheme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	};

	if (!mounted) return null;

	return (
		<div className="p-6 m-4 border border-gray-300 dark:border-gray-700 rounded-lg">
			<h3 className="font-bold text-lg mb-4">Theme Test Component</h3>

			<div className="space-y-2 mb-4">
				<p>
					Theme from useTheme():{" "}
					<span className="font-mono">{theme}</span>
				</p>
				<p>
					Resolved theme:{" "}
					<span className="font-mono">{resolvedTheme}</span>
				</p>
				<p>
					Dark class on HTML:{" "}
					<span className="font-mono">
						{isHtmlDark ? "Yes" : "No"}
					</span>
				</p>
			</div>

			<div className="grid grid-cols-2 gap-4 mb-4">
				<div className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white rounded">
					This box should change color
				</div>
				<div className="p-4 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded">
					This blue box should change shade
				</div>
			</div>

			<p className="text-red-500 dark:text-green-500 mb-4">
				This text should be RED in light mode and GREEN in dark mode
			</p>

			<button
				onClick={toggleTheme}
				className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
			>
				Force Toggle Theme
			</button>
		</div>
	);
}
