import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { toast } from 'react-toastify';
import Assignorders from '../pages/assignorders/assignorders'; 

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

  const sampleOrders = [
    {
      _id: '1',
      ADDRESS: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        street: '123 Main St',
        city: 'Anytown',
        province: 'CA',
        country: 'USA',
        postalcode: '12345',
        phone: '1234567890',
      },
      STATUS: 'Order received',
      AMOUNT: 100,
    },
    {
      _id: '2',
      ADDRESS: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        street: '456 Oak St',
        city: 'Othertown',
        province: 'TX',
        country: 'USA',
        postalcode: '67890',
        phone: '0987654321',
      },
      STATUS: 'Processing Order',
      AMOUNT: 150,
    },
  ];

  afterEach(() => {
    mock.reset();
  });

  test('renders correctly', async () => {
    mock.onGet(`${apiUrl}/api/order/list`).reply(200, { success: true, data: sampleOrders });

    render(<Assignorders />);

    // Check for initial elements
    expect(screen.getByText('Assign Orders')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Assign to:')).toBeInTheDocument();

    // Wait for the API call to complete and check for list items
    await waitFor(() => {
      expect(screen.getByText('John Doe john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith jane.smith@example.com')).toBeInTheDocument();
    });
  });

  test('handles fetch list error', async () => {
    mock.onGet(`${apiUrl}/api/order/list`).reply(200, { success: false });

    render(<Assignorders />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error');
    });
  });

  test('updates order status', async () => {
    mock.onGet(`${apiUrl}/api/order/list`).reply(200, { success: true, data: sampleOrders });
    mock.onPost(`${apiUrl}/api/order/status`).reply(200, { success: true });

    render(<Assignorders />);

    // Wait for the API call to complete
    await waitFor(() => {
      expect(screen.getByText('John Doe john.doe@example.com')).toBeInTheDocument();
    });

    const statusSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(statusSelect, { target: { value: 'Order Shipped' } });

    await waitFor(() => {
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].data).toContain('Order Shipped');
    });
  });

  test('handles product category change', async () => {
    mock.onGet(`${apiUrl}/api/order/list`).reply(200, { success: true, data: sampleOrders });

    render(<Assignorders />);

    // Wait for the API call to complete
    await waitFor(() => {
      expect(screen.getByText('John Doe john.doe@example.com')).toBeInTheDocument();
    });

    const categorySelect = screen.getAllByRole('combobox')[1];
    fireEvent.change(categorySelect, { target: { value: 'Spaza 2' } });

    expect(categorySelect.value).toBe('Spaza 2');
  });

  test('handles fetch list', async () => {
    mock.onGet(`${apiUrl}/api/order/list`).reply(200, { success: true, data: sampleOrders });

    render(<Assignorders />);

    // Check for list elements after API call
    await waitFor(() => {
      expect(screen.getByText('John Doe john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith jane.smith@example.com')).toBeInTheDocument();
    });
  });
});