"use client"; // 👈 muy importante porque Apollo Client solo corre en client components

import client from "@/src/config/apollo";
import { ApolloProvider as Provider } from "@apollo/client";
import { ReactNode } from "react";

export default function ApolloProvider({
	children,
}: {
	children: ReactNode;
}) {
	return <Provider client={client}>{children}</Provider>;
}
