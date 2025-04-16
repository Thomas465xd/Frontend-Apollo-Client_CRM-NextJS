export default function Logo({ size = "default" }) {
	// Size variants for different contexts
	const sizeClasses : Record<string, string> = {
		small: "text-3xl",
		default: "text-5xl",
		large: "text-6xl",
	};

	return (
		<div className="flex justify-center items-center py-4">
			<div className="relative">
				{/* Logo text with styling */}
				<h1
					className={`font-sans font-bold ${sizeClasses[size]} tracking-tight`}
				>
					<span className="text-blue-500">Next</span>
					<span className="text-white"> CRM</span>
				</h1>

				{/* Subtle underline accent */}
				<div className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full opacity-70"></div>
			</div>
		</div>
	);
}
