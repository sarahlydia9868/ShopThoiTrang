import cartConstans from "../../constans/cart";

const cart = (
    state = { cartItems: [], shippingInfo: {} },
    action
) => {
    switch (action.type) {
        case cartConstans.ADD_TO_CART:
            const item = action.payload;

            const isItemExist: any = state.cartItems.find(
                (i: any) => i.product === item.product
            );

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i: any) =>
                        i.product === isItemExist.product ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        case cartConstans.REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i: any) => i.product !== action.payload),
            };

        case cartConstans.SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };

        default:
            return state;

    }
};

export default { cart }