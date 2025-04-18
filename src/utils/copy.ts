import { toast } from "react-toastify";

export const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        toast.info("Copiado al portapapeles");
    } catch {
        toast.error("Error al copiar");
    }
};