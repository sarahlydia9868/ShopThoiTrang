import favouriteConstans from "../../constans/favourite";

const favourite = (state = { favouriteItems: [] }, action) => {
  switch (action.type) {
    case favouriteConstans.ADD_TO_FAVOURITE:
      const item = action.payload;

      const isItemExist: any = state.favouriteItems.find(
        (i: any) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          favouriteItems: state.favouriteItems.map((i: any) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          favouriteItems: [...state.favouriteItems, item],
        };
      }

    case favouriteConstans.REMOVE_FROM_FAVOURITE:
      return {
        ...state,
        favouriteItems: state.favouriteItems.filter(
          (i: any) => i.product !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default { favourite };
