import { OrderState, OrderAction } from './OrderContext';

const OrderReducer = (state: OrderState, action: OrderAction): OrderState => {
    switch(action.type) {
        case "ADD_CLIENT":
            if (action.payload && typeof action.payload === 'object') {
                return {
                    ...state,
                    client: [action.payload]
                };
            }

        return state;
            
        case "ADD_PRODUCT":
            if (action.payload && typeof action.payload === "object") {
                const merged = action.payload.map(product => {
                    const existing = state.products.find(p => p.id === product.id);
                    if (existing) {
                        return { ...existing, ...product };
                    } else {
                        return { ...product, quantity: 0 }; // 👈 set default quantity
                    }
                });
        
                return {
                    ...state,
                    products: merged,
                };
            }
            return state;     
            
            case "UPDATE_QUANTITY":
                if(action.payload && typeof action.payload === 'object') {
                    return {
                        ...state,
                        products: state.products.map(product => 
                            product.id === action.payload.id ? action.payload : product
                        )
                    };
                }

        return state;

        case "UPDATE_TOTAL":
            return {
                ...state, 
                total: state.products.reduce((accumulator, product) => accumulator + (product.priceWithDiscount ?? product.price) * (product.quantity ?? 0), 0)
            }

        default:
            return state;
    }
}

export default OrderReducer;