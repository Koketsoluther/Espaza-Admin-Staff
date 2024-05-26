import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { toast } from 'react-toastify';
import Assignorders from '../pages/assignorders/assignorders'; // Adjust the import path as needed

// Setup axios mock
const mock = new MockAdapter(axios);

// Mock the toast methods
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Assignorders Component', () => {
  const apiUrl = 'https://us-central1-e-spazadb.cloudfunctions.net/func';

  beforeEach(() => {
    // Reset mocks before each test
    mock.reset();
    jest.clearAllMocks();
  });

  test('renders correctly', async () => {
    mock.onGet(`${apiUrl}/api/order/list`).reply(200, {
      success: true,
      data: [
        {
          _id: '1',
          ADDRESS: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            street: '123 Main St',
            city: 'Anytown',
            province: 'Anystate',
            country: 'Country',
            postalcode: '12345',
            phone: '1234567890',
          },
          AMOUNT: 100,
          SHOPID: '0',
        },
      ],
    });

    mock.onGet(`${apiUrl}/api/shop/list`).reply(200, {
      success: true,
      data: [
        { _id: '1', NAME: 'Shop 1' },
        { _id: '2', NAME: 'Shop 2' },
      ],
    });

    render(<Assignorders />);

    await waitFor(() => {
      expect(screen.getByText('Assign Orders')).toBeInTheDocument();
      expect(screen.getByText('Order Details')).toBeInTheDocument();
      expect(screen.getByText('Price')).toBeInTheDocument();
      expect(screen.getByText('Assign to:')).toBeInTheDocument();
      expect(screen.getByText('John Doe john@example.com')).toBeInTheDocument();
      expect(screen.getByText('123 Main St Anytown Anystate')).toBeInTheDocument();
      expect(screen.getByText('Country Postal-Code: 12345 01234567890')).toBeInTheDocument();
      expect(screen.getByText('R100')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /assign/i })).toBeInTheDocument();
    });
  });

  test('handles shop selection and order assignment', async () => {
    mock.onGet(`${apiUrl}/api/order/list`).reply(200, {
      success: true,
      data: [
        {
          _id: '1',
          ADDRESS: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            street: '123 Main St',
            city: 'Anytown',
            province: 'Anystate',
            country: 'Country',
            postalcode: '12345',
            phone: '1234567890',
          },
          AMOUNT: 100,
          SHOPID: '0',
        },
      ],
    });

    mock.onGet(`${apiUrl}/api/shop/list`).reply(200, {
      success: true,
      data: [
        { _id: '1', NAME: 'Shop 1' },
        { _id: '2', NAME: 'Shop 2' },
      ],
    });

    mock.onPost(`${apiUrl}/api/order/assign`).reply(200, {
      success: true,
    });

    render(<Assignorders />);

    await waitFor(() => {
      expect(screen.getByText('Assign Orders')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /assign/i })).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
    fireEvent.click(screen.getByRole('button', { name: /assign/i }));

    await waitFor(() => {
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].data).toEqual(JSON.stringify({ orderId: '1', SHOPID: '1' }));
      expect(toast.success).toHaveBeenCalledWith('Order updated and removed from display');
    });
  });

  test('handles errors in fetching orders', async () => {
    mock.onGet(`${apiUrl}/api/order/list`).reply(500);

    render(<Assignorders />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error fetching orders');
    });
  });

  test('handles errors in fetching shops', async () => {
    mock.onGet(`${apiUrl}/api/shop/list`).reply(500);

    render(<Assignorders />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error fetching shop list');
    });
  });

  test('handles errors in updating order status', async () => {
    mock.onGet(`${apiUrl}/api/order/list`).reply(200, {
      success: true,
      data: [
        {
          _id: '1',
          ADDRESS: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            street: '123 Main St',
            city: 'Anytown',
            province: 'Anystate',
            country: 'Country',
            postalcode: '12345',
            phone: '1234567890',
          },
          AMOUNT: 100,
          SHOPID: '0',
        },
      ],
    });

    mock.onGet(`${apiUrl}/api/shop/list`).reply(200, {
      success: true,
      data: [
        { _id: '1', NAME: 'Shop 1' },
        { _id: '2', NAME: 'Shop 2' },
      ],
    });

    mock.onPost(`${apiUrl}/api/order/assign`).reply(500);

    render(<Assignorders />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /assign/i })).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
    fireEvent.click(screen.getByRole('button', { name: /assign/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error updating order');
    });
  });
});