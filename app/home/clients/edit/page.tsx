import { redirect } from "next/navigation";

export default function ClientsEdit() {
	return (
        redirect("/home/clients") // Redirect to the clients page
	);
}
