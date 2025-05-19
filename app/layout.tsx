import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Poppins } from "next/font/google";
import ApolloProvider from "@/components/providers/ApolloProvider";
import ToastProvider from "@/components/providers/ToastProvider";
import OrderState from "@/src/context/orders/OrderState";
import { Providers } from "@/components/providers/ThemeProvider";
import { Analytics } from "@vercel/analytics/next"

// Font optimization
const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-poppins",
	display: "swap", // Ensures text remains visible during font loading
});

// SEO metadata configuration with expanded properties
export const metadata: Metadata = {
	title: {
		template: "%s | CRM Client Administration",
		default: "CRM Client Administration - Manage Your Clients Efficiently",
	},
	description:
		"Professional CRM solution for efficient client management, order tracking, and business analytics.",
	keywords: [
		"CRM",
		"Client Management",
		"Business Administration",
		"Customer Relationship",
		"Order Management",
	],
	authors: [{ name: "Thomas Schrödinger" }],
	creator: "Thomas Schrödinger / DevX",
	publisher: "DevX",
	formatDetection: {
		email: false,
		telephone: false,
	},
	metadataBase: new URL("https://next-crm-graphql.vercel.app"),
	alternates: {
		canonical: "/",
		languages: {
			"en-US": "/en-us",
			"es-ES": "/es",
		},
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://next-crm-graphql.vercel.app",
		title: "CRM Client Administration - Manage Your Clients Efficiently",
		description:
			"Professional CRM solution for efficient client management, order tracking, and business analytics.",
		siteName: "CRM Administration System",
		images: [
			{
				url: "https://next-crm-graphql.vercel.app/og-image.png",
				width: 1200,
				height: 630,
				alt: "CRM Client Administration",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "CRM Client Administration System",
		description:
			"Professional CRM solution for efficient client management",
		creator: "@yourcompany",
		images: ["https://next-crm-graphql.vercel.app/og-image.png"],
	},
	applicationName: "CRM Client Administration",
	category: "Business Software",
};

// Viewport configuration for responsive design and mobile optimization
export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#0f172a" },
	],
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${poppins.variable}`}
		>
			<head>
				<link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" sizes="180x180" href="/icon-192x192.png" />
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>

				{/* Preconnect to essential third-party domains */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>

				{/* Prevent indexing in non-production environments */}
				{process.env.NODE_ENV !== "production" && (
					<meta name="robots" content="noindex, nofollow" />
				)}
			</head>
			<body className="font-sans antialiased min-h-screen flex flex-col">
				<ApolloProvider>
					<Providers>
						<OrderState>
							<ToastProvider />

							<main className="flex-grow">{children}</main>

							{/* Structured schema data for better search engine understanding */}
							<script
								type="application/ld+json"
								dangerouslySetInnerHTML={{
									__html: JSON.stringify({
										"@context": "https://schema.org",
										"@type": "SoftwareApplication",
										name: "CRM Client Administration",
										applicationCategory:
											"BusinessApplication",
										offers: {
											"@type": "Offer",
											price: "0",
											priceCurrency: "USD",
										},
									}),
								}}
							/>

							{/* Analytics tracking (only in production)*/}
                            <Analytics />
						</OrderState>
					</Providers>
				</ApolloProvider>
			</body>
		</html>
	);
}
