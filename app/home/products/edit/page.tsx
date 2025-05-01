import { redirect } from "next/navigation";

export default function ProductsEdit() {
	return (
        redirect("/home/clients") // Redirect to the clients page
	);
}
