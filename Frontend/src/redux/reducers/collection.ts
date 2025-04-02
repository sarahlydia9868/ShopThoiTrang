import { CollectionConstans } from "../../constans/collection";

export interface ICollectionRoot {
  loading?: boolean;
  error?: boolean;
  message?: string;
  collections?: CollectionModel[];
}

const collections = (state = { collections: [] }, action: { type: CollectionConstans; payload?: CollectionModel[]; message?: string }): ICollectionRoot => {
  switch (action.type) {
    case CollectionConstans.ALL_COLLECTION_REQUEST:
      return {
        loading: true,
        collections: [],
      };
    case CollectionConstans.ALL_COLLECTION_SUCCESS:
      return {
        loading: false,
        collections: action.payload,
      };

    case CollectionConstans.ALL_COLLECTION_FAIL:
      return {
        loading: false,
        error: true,
        message: action.message,
      };
    case CollectionConstans.CLEAR_ERRORS:
      return {
        ...state,
        error: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export interface ICollectionDetailRoot {
  loading?: boolean;
  error?: boolean;
  message?: string;
  collection?: CollectionModel;
}

const collectionDetail = (state = {}, action: { type: CollectionConstans; payload?: CollectionModel; message?: string }): ICollectionDetailRoot => {
  switch (action.type) {
    case CollectionConstans.COLLECTION_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case CollectionConstans.COLLECTION_DETAILS_SUCCESS:
      return {
        loading: false,
        collection: action.payload,
      };
    case CollectionConstans.COLLECTION_DETAILS_FAIL:
      return {
        loading: false,
        error: true,
        message: action.message,
      };
    case CollectionConstans.CLEAR_ERRORS:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
};

export interface INewCollectionRoot {
  loading?: boolean;
  error?: boolean;
  message?: string;
  success?: boolean;
}

// New Product ----Admin
const newCollection = (state = {}, action: { type: CollectionConstans; message?: string }): INewCollectionRoot => {
  switch (action.type) {
    case CollectionConstans.NEW_COLLECTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CollectionConstans.NEW_COLLECTION_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.message,
      };
    case CollectionConstans.NEW_COLLECTION_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case CollectionConstans.NEW_COLLECTION_RESET:
      return {
        ...state,
        success: false,
        message: action.message,
      };
    case CollectionConstans.CLEAR_ERRORS:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
};

export interface IDeleteCollectionRoot {
  loading?: boolean;
  error?: boolean;
  message?: string;
  isDeleted?: boolean;
}

// Delete Collection
const deleteCollection = (state = {}, action: { type: CollectionConstans; message?: string }): IDeleteCollectionRoot  => {
  switch (action.type) {
    case CollectionConstans.DELETE_COLLECTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CollectionConstans.DELETE_COLLECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
        message: action.message
      };
    case CollectionConstans.DELETE_COLLECTION_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case CollectionConstans.DELETE_COLLECTION_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CollectionConstans.CLEAR_ERRORS:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
};

export default {
  deleteCollection,
  newCollection,
  collectionDetail,
  collections,
};
