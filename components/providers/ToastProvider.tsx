"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

export default function ToastProvider() {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		// Solo corre en cliente
		const savedTheme = localStorage.getItem("theme") as
			| "light"
			| "dark"
			| null;
		if (savedTheme) {
			setTheme(savedTheme);
		}
	}, []);

	return (
		<ToastContainer position="top-right" autoClose={3000} theme={theme} />
	);
}
