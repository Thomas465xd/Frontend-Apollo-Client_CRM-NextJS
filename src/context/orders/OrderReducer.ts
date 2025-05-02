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
                if(action.payload && typeof action.payload === 'object') {
                    return {
                        ...state,
                        products: action.payload, // ← TS knows it's Product[] now
                    };
                }
            
        default:
            return state;
    }
}

export default OrderReducer;