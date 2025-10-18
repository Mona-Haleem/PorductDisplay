import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import UIReducer from '@/store/slices/UISlice';
import { ThemeProvider } from '@/Theme/ThemeContext';

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
      mutations: { retry: false },
    },
  });

export const createMockStore = (superadmin = false) =>
  configureStore({
    reducer: { auth: authReducer, UI: UIReducer },
    preloadedState: {
      auth: {
        user: {
          id: 1,
          username: 'emilys',
          email: 'emily@example.com',
          firstName: 'Emily',
          lastName: 'Johnson',
          gender: 'female',
          image: 'https://dummyjson.com/icon/emilys/128',
        },
        token: 'test-token',
        isAuthenticated: true,
        superadmin,
      },
      UI: {
        showDeleteModal: { visisble: false, productId: 0, productTitle: '' },
      },
    },
  });

export const renderWithProviders = (ui: React.ReactElement, superadmin = false) => {
  const queryClient = createTestQueryClient();
  const store = createMockStore(superadmin);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <NavigationContainer>{ui}</NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};


