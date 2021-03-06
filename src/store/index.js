import { createContext } from "react";
import useReducerWithThunk from "use-reducer-thunk";
import {
  SET_PAGE_TITLE,
  SET_PAGE_CONTENT,
  SET_NAVBAR_ACTIVEITEM,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
  SET_PRODUCT_DETAIL,
  BEGIN_PRODUCTS_FEED,
  SUCCESS_PRODUCTS_FEED,
  FAIL_PRODUCTS_FEED,
  BEGIN_PRODUCTS_REQUEST,
  SUCCESS_PRODUCTS_REQUEST,
  FAIL_PRODUCTS_REQUEST,
  BEGIN_LOGIN_REQUEST,
  SUCCESS_LOGIN_REQUEST,
  FAIL_LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REMEMBER_LOGIN,
  BEGIN_REGISTER_REQUEST,
  SUCCESS_REGISTER_REQUEST,
  FAIL_REGISTER_REQUEST,
  BEGIN_UPDATE_USERINFO,
  SUCCESS_UPDATE_USERINFO,
  FAIL_UPDATE_USERINFO,
  BEGIN_ORDER_CREATE,
  SUCCESS_ORDER_CREATE,
  FAIL_ORDER_CREATE,
  //wk12
  BEGIN_USERORDER_REQUEST,
  SUCCESS_USERORDER_REQUEST,
  FAIL_USERORDER_REQUEST,
  SET_USERORDER_CONTENT,
  SET_SEARCHED_DETAIL
 
} from "../utils/constants";

export const StoreContext = createContext();
let cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  allProducts: [],
  page: {
    title: "",
    products: [],
  },
  productDetail: {
    product: {},
    qty: 1,
  },
  navBar: {
    activeItem: "/",
  },
  cart: {
    cartItems,
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: 'Google',
  },
  orderInfo: { 
    loading: false,
    order: localStorage.getItem('orderInfo')
    ? JSON.parse(localStorage.getItem('orderInfo'))
    : { id: ""}
  },
  feedProducts: {
    loading: false,
    error: null,
  },
  requestProducts: {
    loading: false,
    error: null,
  },
  userSignin: {
    loading: false,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    remember: true,
    error: "",
  },
  userRegister: {
    loading: false,
    userInfo: null,
    error: "",
  },
  //wk12
  requestUserOrder:{
    loading: false,
    error: null
  },
  userOrder:{
    order:[],
  },
  searchedDetail:{
    order:{}
  }

  
};

function reducer(state, action) {
  switch (action.type) {
    case SET_PAGE_TITLE:
      return {
        ...state,
        page: {
          ...state.page,
          title: action.payload,
        },
      };
    case SET_PAGE_CONTENT:
      return {
        ...state,
        page: {
          ...state.page,
          ...action.payload,
        },
      };
    case SET_NAVBAR_ACTIVEITEM:
      return {
        ...state,
        navBar: {
          activeItem: action.payload,
        },
      };
    case ADD_CART_ITEM:
      const item = action.payload;
      const product = state.cart.cartItems.find((x) => x.id === item.id);
      if (product) {
        cartItems = state.cart.cartItems.map((x) =>
          x.id === product.id ? item : x
        );
        return { ...state, cart: { ...state.cart, cartItems } };
      }
      cartItems = [...state.cart.cartItems, item];
      return { ...state, cart: { ...state.cart, cartItems } };
    case REMOVE_CART_ITEM:
      cartItems = state.cart.cartItems.filter((x) => x.id !== action.payload);
      return { ...state, cart: { ...state.cart, cartItems } };
    case SAVE_SHIPPING_ADDRESS:
      console.log('action.payload.shippingAddress = ')
      console.log(action.payload)
      return { ...state, cart: { ...state.cart, shippingAddress: action.payload } };
    case SAVE_PAYMENT_METHOD:
      return { ...state, cart: { ...state.cart, paymentMethod: action.payload } };
    case SET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: { ...state.productDetail, ...action.payload },
      };
    case BEGIN_PRODUCTS_REQUEST:
      return {
        ...state,
        requestProducts: { ...state.requestProducts, loading: true },
      };
    case SUCCESS_PRODUCTS_REQUEST:
      return {
        ...state,
        requestProducts: { ...state.requestProducts, loading: false },
      };
    case FAIL_PRODUCTS_REQUEST:
      return {
        ...state,
        requestProducts: {
          ...state.requestProducts,
          loading: false,
          error: action.payload,
        },
      };
    case BEGIN_PRODUCTS_FEED:
      return {
        ...state,
        feedProducts: { ...state.feedProducts, loading: true },
      };
    case SUCCESS_PRODUCTS_FEED:
      return {
        ...state,
        feedProducts: { ...state.feedProducts, loading: false },
      };
    case FAIL_PRODUCTS_FEED:
      return {
        ...state,
        feedProducts: {
          ...state.feedProducts,
          loading: false,
          error: action.payload,
        },
      };
    case BEGIN_LOGIN_REQUEST:
      return { ...state, userSignin: { ...state.userSignin, loading: true } };
    case SUCCESS_LOGIN_REQUEST:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          userInfo: action.payload,
          error: "",
        },
      };
    case FAIL_LOGIN_REQUEST:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          userInfo: null,
          error: action.payload,
        },
      };
    case BEGIN_UPDATE_USERINFO:
      return { ...state, userSignin: { ...state.userSignin, loading: true } };
    case SUCCESS_UPDATE_USERINFO:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          userInfo: action.payload,
          error: "",
        },
      };
    case FAIL_UPDATE_USERINFO:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          error: action.payload,
        },
      };
    case LOGOUT_REQUEST:
      cartItems = [];
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          userInfo: null,
        },
      };
    case REMEMBER_LOGIN:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          remember: action.payload,
        },
      };
    case BEGIN_REGISTER_REQUEST:
      return {
        ...state,
        userRegister: { ...state.userRegister, loading: true },
      };
    case SUCCESS_REGISTER_REQUEST:
      return {
        ...state,
        userRegister: {
          ...state.userRegister,
          loading: false,
          userInfo: action.payload,
          error: "",
        },
        userSignin: {
          ...state.userSignin,
          userInfo: action.payload,
        },
      };
    case FAIL_REGISTER_REQUEST:
      return {
        ...state,
        userRegister: {
          ...state.userRegister,
          loading: false,
          userInfo: null,
          error: action.payload,
        },
      };
      case BEGIN_ORDER_CREATE:
        return { ...state, orderInfo: { ...state.orderInfo, loading: true } };
      case SUCCESS_ORDER_CREATE:
        return {
          ...state,
          orderInfo: {
            ...state.orderInfo,
            loading: false,
            order: action.payload,
            error: "",
          },
        };
      case FAIL_ORDER_CREATE:
        return {
          ...state,
          orderInfo: {
            ...state.orderInfo,
            loading: false,
            order: {id:""},
            error: action.payload,
          },
        };
    //wk12
    //BEGIN_USERORDER_REQUEST,
    // SUCCESS_USERORDER_REQUEST,
    // FAIL_USERORDER_REQUEST,
    // SET_USERORDER_CONTENT,
    // SET_SEARCHED_DETAIL
      case BEGIN_USERORDER_REQUEST:
        return {
          ...state,
          requestUserOrder:{
            ...state.requestUserOrder,
            loading: true,
          }
        };
      case SUCCESS_USERORDER_REQUEST:
        return {
          ...state,
          requestUserOrder:{
            ...state.requestUserOrder,
            loading: false,
          }
        };
      case FAIL_USERORDER_REQUEST:
        return {
          ...state,
          requestUserOrder:{
            ...state.requestUserOrder,
            loading: false,
            error: action.payload,
          }
        };
      case SET_USERORDER_CONTENT:
        return{
          ...state,
          userOrder:{
            ...state.userOrder,
            ...action.payload,
          }
        };
      case SET_SEARCHED_DETAIL:
        return{
          ...state,
          searchedDetail:{
            ...state.searchedDetail,
            ...action.payload,
          }
        }
      

  
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducerWithThunk(
    reducer,
    initialState,
    "example"
  );
  // const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}
