import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';

export const useStore = create(
  persist(
    (set, get) => ({
      // Dark Mode
      isDarkMode: false,
      toggleDarkMode: () => set((state: any) => ({ isDarkMode: !state.isDarkMode })),
      // Informations utilisateur
      userName: '',
      setUserName: (name: string) => set({ userName: name }),
      user: null,
      // email courant pour associer panier / favoris
      currentUserEmail: '',
      // Données par utilisateur (clé = email)
      userDataByEmail: {},
      setUser: (user: any) =>
        set((state: any) => {
          const email =
            user?.email && typeof user.email === 'string'
              ? user.email.toLowerCase()
              : '';

          const existingData =
            email && state.userDataByEmail[email]
              ? state.userDataByEmail[email]
              : {
                CartList: [],
                FavoritesList: [],
                OrderHistoryList: [],
                CartPrice: 0,
              };

          return {
            ...state,
            user,
            userName: user?.name || '',
            currentUserEmail: email,
            CartList: existingData.CartList || [],
            FavoritesList: existingData.FavoritesList || [],
            OrderHistoryList: existingData.OrderHistoryList || [],
            CartPrice: existingData.CartPrice || 0,
            userDataByEmail: {
              ...state.userDataByEmail,
              ...(email ? { [email]: existingData } : {}),
            },
          };
        }),
      clearUser: () =>
        set((state: any) => ({
          ...state,
          user: null,
          userName: '',
          currentUserEmail: '',
          CartList: [],
          FavoritesList: [],
          OrderHistoryList: [],
          CartPrice: 0,
        })),
      CoffeeList: CoffeeData,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],
      addToCart: (cartItem: any) =>
        set(
          produce((state: any) => {
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == cartItem.id) {
                found = true;
                let size = false;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (
                    state.CartList[i].prices[j].size == cartItem.prices[0].size
                  ) {
                    size = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                if (size == false) {
                  state.CartList[i].prices.push(cartItem.prices[0]);
                }
                state.CartList[i].prices.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            if (found == false) {
              state.CartList.push(cartItem);
            }

            const email = state.currentUserEmail;
            if (email) {
              if (!state.userDataByEmail[email]) {
                state.userDataByEmail[email] = {
                  CartList: [],
                  FavoritesList: [],
                  OrderHistoryList: [],
                  CartPrice: 0,
                };
              }
              state.userDataByEmail[email].CartList = state.CartList;
            }
          }),
        ),
      calculateCartPrice: () =>
        set(
          produce((state: any) => {
            let totalprice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let tempprice = 0;
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                tempprice =
                  tempprice +
                  parseFloat(state.CartList[i].prices[j].price) *
                  state.CartList[i].prices[j].quantity;
              }
              state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
              totalprice = totalprice + tempprice;
            }
            state.CartPrice = totalprice.toFixed(2).toString();

            const email = state.currentUserEmail;
            if (email && state.userDataByEmail[email]) {
              state.userDataByEmail[email].CartPrice = state.CartPrice;
            }
          }),
        ),
      addToFavoriteList: (type: string, id: string) =>
        set(
          produce((state: any) => {
            if (type == 'Coffee') {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id == id) {
                  if (state.CoffeeList[i].favourite == false) {
                    state.CoffeeList[i].favourite = true;
                    state.FavoritesList.unshift(state.CoffeeList[i]);
                  } else {
                    state.CoffeeList[i].favourite = false;
                  }
                  break;
                }
              }
            }
            const email = state.currentUserEmail;
            if (email) {
              if (!state.userDataByEmail[email]) {
                state.userDataByEmail[email] = {
                  CartList: [],
                  FavoritesList: [],
                  OrderHistoryList: [],
                  CartPrice: 0,
                };
              }
              state.userDataByEmail[email].FavoritesList = state.FavoritesList;
            }
          }),
        ),
      deleteFromFavoriteList: (type: string, id: string) =>
        set(
          produce((state: any) => {
            if (type == 'Coffee') {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id == id) {
                  if (state.CoffeeList[i].favourite == true) {
                    state.CoffeeList[i].favourite = false;
                  } else {
                    state.CoffeeList[i].favourite = true;
                  }
                  break;
                }
              }
            }
            let spliceIndex = -1;
            for (let i = 0; i < state.FavoritesList.length; i++) {
              if (state.FavoritesList[i].id == id) {
                spliceIndex = i;
                break;
              }
            }
            state.FavoritesList.splice(spliceIndex, 1);

            const email = state.currentUserEmail;
            if (email && state.userDataByEmail[email]) {
              state.userDataByEmail[email].FavoritesList = state.FavoritesList;
            }
          }),
        ),
      incrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce((state: any) => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size == size) {
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
              }
            }

            const email = state.currentUserEmail;
            if (email && state.userDataByEmail[email]) {
              state.userDataByEmail[email].CartList = state.CartList;
            }
          }),
        ),
      decrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce((state: any) => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size == size) {
                    if (state.CartList[i].prices.length > 1) {
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        state.CartList[i].prices.splice(j, 1);
                      }
                    } else {
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        state.CartList.splice(i, 1);
                      }
                    }
                    break;
                  }
                }
              }
            }

            const email = state.currentUserEmail;
            if (email && state.userDataByEmail[email]) {
              state.userDataByEmail[email].CartList = state.CartList;
            }
          }),
        ),
      addToOrderHistoryListFromCart: () =>
        set(
          produce((state: any) => {
            let temp = state.CartList.reduce(
              (accumulator: number, currentValue: any) =>
                accumulator + parseFloat(currentValue.ItemPrice),
              0,
            );
            if (state.OrderHistoryList.length > 0) {
              state.OrderHistoryList.unshift({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            } else {
              state.OrderHistoryList.push({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            }
            state.CartList = [];

            const email = state.currentUserEmail;
            if (email) {
              if (!state.userDataByEmail[email]) {
                state.userDataByEmail[email] = {
                  CartList: [],
                  FavoritesList: [],
                  OrderHistoryList: [],
                  CartPrice: 0,
                };
              }
              state.userDataByEmail[email].OrderHistoryList =
                state.OrderHistoryList;
              state.userDataByEmail[email].CartList = state.CartList;
              state.userDataByEmail[email].CartPrice = state.CartPrice;
            }
          }),
        ),
    }),
    {
      name: 'Fahem_Elaa_G5',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
