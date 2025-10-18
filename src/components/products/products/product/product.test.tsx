import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductCard from './Product';
import { Product } from '@/types/product';
import authReducer from '@/store/slices/authSlice';
import UIReducer from '@/store/slices/UISlice';

jest.mock('expo-image', () => ({
  Image: 'Image',
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  category: 'electronics',
  thumbnail: 'https://example.com/image.jpg',
  isDeleted: false,
};

const createMockStore = (superadmin = false) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      UI: UIReducer,
    },
    preloadedState: {
      auth: {
        superadmin,
        user: null,
        token: null,
        isAuthenticated: false,
      },
      UI: {
        showDeleteModal: {
          visisble: false,
          productId: 0,
          productTitle: '',
        },
      },
    },
  });
};

describe('ProductCard Component', () => {
  it('should render product card with correct title and image', () => {
    const store = createMockStore(false);
    const { getByText } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    expect(getByText('Test Product')).toBeTruthy();
  });

  it('should not show delete button when user is not superadmin', () => {
    const store = createMockStore(false);
    const { queryByTestId } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );
  expect(queryByTestId('delete-button')).toBeNull();
  });

  it('should show delete button when user is superadmin', () => {
    const store = createMockStore(true);
    const { getByTestId } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    expect(getByTestId('delete-button')).toBeTruthy();
  });

  
  it('should dispatch setShowDeleteModal when delete button is pressed', () => {
    const store = createMockStore(true);
    const { getByTestId } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    const deleteButton = getByTestId('delete-button');
    fireEvent.press(deleteButton);

    const state = store.getState();
    expect(state.UI.deleteModal.visisble).toBe(true);
    expect(state.UI.deleteModal.productId).toBe(1);
    expect(state.UI.deleteModal.productTitle).toBe('Test Product');
  });


  it('should truncate long product titles', () => {
    const longTitleProduct: Product = {
      ...mockProduct,
      title: 'This is a very long product title that should be truncated',
    };
    const store = createMockStore(false);
    const { getByText } = render(
      <Provider store={store}>
        <ProductCard product={longTitleProduct} />
      </Provider>
    );

    const titleElement = getByText(longTitleProduct.title);
    expect(titleElement.props.numberOfLines).toBe(2);
    expect(titleElement.props.ellipsizeMode).toBe('tail');
  });

  it('should render image with correct props for caching', () => {
    const store = createMockStore(false);
    const { UNSAFE_getByType } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    const image = UNSAFE_getByType('Image' as any);
    expect(image.props.source.uri).toBe(mockProduct.thumbnail);
    expect(image.props.cachePolicy).toBe('disk');
    expect(image.props.contentFit).toBe('cover');
  });
});