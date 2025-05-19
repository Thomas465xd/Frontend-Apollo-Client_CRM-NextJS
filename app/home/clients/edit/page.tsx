import { redirect } from "next/navigation";

export default function ClientsEditHome() {
	return (
        redirect("/home/clients") // Redirect to the clients page
	);
}
