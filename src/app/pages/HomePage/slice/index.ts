import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { OrderState } from './types';
import { isEmpty } from 'lodash';

export const initialState: OrderState = {
  name: '',
  homeNumber: undefined,
  phone: undefined,
  email: '',
  withdrawalHour: '',
  orderItems: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: state => {
      state.orderItems = [];
    },
    updateQuantity: (state, action) => {
      const currentTargetState = state.orderItems?.find(
        order => order.id == action.payload.id,
      );
      const updatedItems = state.orderItems?.map((item, index) => {
        if (item.id === action.payload.id)
          return { ...currentTargetState, quantity: action.payload.quantity };
        else {
          return state.orderItems?.[index];
        }
      });
      // @ts-ignore
      state.orderItems = updatedItems;
    },
    updateInfos: (state, action: PayloadAction<any>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.homeNumber = action.payload.homeNumber;
      state.phone = action.payload.phone;
    },
    addOrderInfos: (state, action: PayloadAction<any>) => {
      if (state.orderItems) {
        const currentTargetState = state.orderItems.find(
          order => order.id == action.payload.id,
        );
        const alreadyExist = !isEmpty(
          state.orderItems.find(order => order.id == action.payload.id),
        );
        let filteredItems = state.orderItems.filter(
          item => item.id !== action.payload.id,
        );
        if (alreadyExist && currentTargetState) {
          filteredItems.push({
            ...action.payload,
            quantity: currentTargetState.quantity! + 1,
          });
        }

        alreadyExist
          ? (state.orderItems = filteredItems)
          : state.orderItems.push({
              ...action.payload,
              quantity: 1,
            });
      }
    },
    removeItem: (state, action) => {
      const filteredItems = state.orderItems?.filter(
        item => item.id !== action.payload,
      );
      console.log(
        'filteredItems:',
        filteredItems,
        'action.payload:',
        action.payload,
        'state.orderItems:',
        state.orderItems,
      );
      state.orderItems = filteredItems;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset, updateInfos, addOrderInfos, updateQuantity, removeItem } =
  orderSlice.actions;

export default orderSlice.reducer;

export const store = configureStore({
  reducer: {
    order: orderSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
