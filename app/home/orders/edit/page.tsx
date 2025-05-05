import { redirect } from "next/navigation";

export default function ProductsEdit() {
    return (
        redirect("/home/orders") // Redirect to the clients page
    );
}
