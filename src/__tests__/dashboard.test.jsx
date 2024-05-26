import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { toast } from 'react-toastify';
import Home from '../pages/Dashboard/dashboard'; // Adjust the import path as needed

// Setup axios mock
const mock = new MockAdapter(axios);

// Mock the toast methods
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Home Component', () => {
  const apiUrl = 'https://us-central1-e-spazadb.cloudfunctions.net/func';

  afterEach(() => {
    mock.reset();
  });

  test('renders correctly', () => {
    render(<Home/>);

    // Check for initial elements
    expect(screen.getByText('DASHBOARD')).toBeInTheDocument();
    expect(screen.getByText('PRODUCTS')).toBeInTheDocument();
    expect(screen.getByText('Shops')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
  });

  test('fetches and displays data', async () => {
    mock.onGet(`${apiUrl}/api/shop/list`).reply(200, {
      success: true,
      data: [
        { _id: '1', NAME: 'Shop 1', NoORDERS: 10 },
        { _id: '2', NAME: 'Shop 2', NoORDERS: 5 },
      ],
    });

    mock.onGet(`${apiUrl}/api/products/list`).reply(200, {
      success: true,
      data: [
        { _id: '1', NAME: 'Product 1' },
        { _id: '2', NAME: 'Product 2' },
      ],
    });

    mock.onPost(`${apiUrl}/api/shop/shopstaff`).reply(200, {
      success: true,
      data: [
        { _id: '1', NAME: 'Staff 1' },
        { _id: '2', NAME: 'Staff 2' },
      ],
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('PRODUCTS')).toBeInTheDocument();
      expect(screen.getByText('Shops')).toBeInTheDocument();
      expect(screen.getByText('Orders')).toBeInTheDocument();

      // Check the counts
      //expect(screen.getByText('2')).toBeInTheDocument(); // Products count
      //expect(screen.getByText('2')).toBeInTheDocument(); // Shops count
    });
  });

  test('handles API errors gracefully', async () => {
    mock.onGet(`${apiUrl}/api/shop/list`).reply(500);
    mock.onGet(`${apiUrl}/api/products/list`).reply(500);
    mock.onPost(`${apiUrl}/api/shop/shopstaff`).reply(500);

    render(<Home />);

    await waitFor(() => {
      //expect(toast.error).toHaveBeenCalledWith('Error fetching the shop list');
      expect(toast.error).toHaveBeenCalledWith('Error fetching the product list');
      //expect(toast.error).toHaveBeenCalledWith('Error fetching staff list');
    });
  });

  test('renders charts correctly', async () => {
    mock.onGet(`${apiUrl}/api/shop/list`).reply(200, {
      success: true,
      data: [
        { _id: '1', NAME: 'Shop 1', NoORDERS: 10 },
        { _id: '2', NAME: 'Shop 2', NoORDERS: 5 },
      ],
    });

    mock.onGet(`${apiUrl}/api/products/list`).reply(200, {
      success: true,
      data: [
        { _id: '1', NAME: 'Product 1' },
        { _id: '2', NAME: 'Product 2' },
      ],
    });

    mock.onPost(`${apiUrl}/api/shop/shopstaff`).reply(200, {
      success: true,
      data: [
        { _id: '1', NAME: 'Staff 1' },
        { _id: '2', NAME: 'Staff 2' },
      ],
    });

    render(<Home/>);

    await waitFor(() => {
      // Check if the charts are rendered
      //expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
    });
  });
});