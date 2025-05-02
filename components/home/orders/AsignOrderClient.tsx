"use client";
import Loader from "@/components/ui/Loader";
import OrderContext from "@/src/context/orders/OrderContext";
import { GET_SELLER_CLIENTS } from "@/src/graphql/clients";
import { ClientInput } from "@/src/types";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

// GraphQL query response type
interface GetSellerClientsData {
	getSellerClients: ClientInput[];
}

export default function AsignOrderClient() {
	// Router
	const router = useRouter();

	//~ State for selected client(s)
	const [client, setClient] = useState<ClientInput | null>(null);

    // Add state to track theme changes
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'light');


    //? Order Context
    const orderContext = useContext(OrderContext);
    const { asignClient } = orderContext;

	//* Query with TypeScript generics
	const { data, loading, error } =
		useQuery<GetSellerClientsData>(GET_SELLER_CLIENTS);

	const getSellerClients = data?.getSellerClients || [];

    //* End 

    // Add theme change listener
    useEffect(() => {
        // Function to handle theme changes
        const handleThemeChange = () => {
            setCurrentTheme(localStorage.getItem('theme') || 'light');
        };

        // Check for theme changes periodically
        const themeCheckInterval = setInterval(handleThemeChange, 100);
        
        // Clean up interval when component unmounts
        return () => {
            clearInterval(themeCheckInterval);
        };
    }, []);

    useEffect(() => {
        if (client) {
            asignClient(client);
        }
    }, [client, asignClient]);

	// Handler for client selection
	const selectClient = (selectedOption: ClientInput | null) => {
		setClient(selectedOption);
	};

	if (loading) return <Loader />;

	if (error) {
		toast.error("Error loading client data");
		router.push("/home/orders");
		return null; // Added explicit return to handle this case
	}

	if(data) return (
		<div>
			<p>Asign Client to Order</p>
			<Select 
				options={getSellerClients}
				onChange={selectClient}
				getOptionValue={(option) => option.id ?? ""}
				getOptionLabel={(option) => `${option.name} ${option.surname}`}
				placeholder="Search or Select a Client"
				noOptionsMessage={() => "No results found"}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: currentTheme === 'dark' ? '#333' : '#fff',
                        color: currentTheme === 'dark' ? '#fff' : '#333',
                        borderColor: state.isFocused 
                            ? (currentTheme === 'dark' ? '#4c9aff' : '#2684FF') 
                            : (currentTheme === 'dark' ? '#555' : '#ccc')
                    }),
                    menu: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: currentTheme === 'dark' ? '#333' : '#fff'
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: state.isFocused 
                            ? (currentTheme === 'dark' ? '#555' : '#f0f0f0') 
                            : (currentTheme === 'dark' ? '#333' : '#fff'),
                        color: currentTheme === 'dark' ? '#fff' : '#333'
                    }),
                    singleValue: (baseStyles) => ({
                        ...baseStyles,
                        color: currentTheme === 'dark' ? '#fff' : '#333'
                    }),
                    input: (baseStyles) => ({
                        ...baseStyles,
                        color: currentTheme === 'dark' ? '#fff' : '#333'
                    }),
                    placeholder: (baseStyles) => ({
                        ...baseStyles,
                        color: currentTheme === 'dark' ? '#aaa' : '#757575'
                    }),
                    multiValue: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: currentTheme === 'dark' ? '#555' : '#e2e8f0'
                    }),
                    multiValueLabel: (baseStyles) => ({
                        ...baseStyles,
                        color: currentTheme === 'dark' ? '#fff' : '#333'
                    }),
                    multiValueRemove: (baseStyles) => ({
                        ...baseStyles,
                        color: currentTheme === 'dark' ? '#fff' : '#333',
                        ':hover': {
                            backgroundColor: currentTheme === 'dark' ? '#777' : '#cbd5e0',
                            color: currentTheme === 'dark' ? '#fff' : '#333'
                        }
                    })
                }}
			/>
		</div>
	);
}
