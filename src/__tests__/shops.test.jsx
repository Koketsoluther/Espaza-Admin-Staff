import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { toast } from 'react-toastify';
import List from '../pages/listShops/shops';  // Adjust the import path as needed

// Setup axios mock
const mock = new MockAdapter(axios);

// Mock the toast methods
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('List Component', () => {
  const apiUrl = 'https://thankful-hill-0b5ec3803-27.westeurope.5.azurestaticapps.net/';
  
  const sampleShops = [
    { _id: '1', NAME: 'Shop 1', ADDRESS: 'Address 1', SHOPOWNER: 'Owner 1' },
    { _id: '2', NAME: 'Shop 2', ADDRESS: 'Address 2', SHOPOWNER: 'Owner 2' },
  ];

  afterEach(() => {
    mock.reset();
  });

  test('renders correctly', async () => {
    mock.onGet(`${apiUrl}/api/shop/list`).reply(200, { success: true, data: sampleShops });

    render(<List />);

    // Check for initial elements
    expect(screen.getByText('All Shops list')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Owner')).toBeInTheDocument();
    expect(screen.getByText('Report')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();

    // Wait for the API call to complete and check for list items
    await waitFor(() => {
      expect(screen.getByText('Shop 1')).toBeInTheDocument();
      expect(screen.getByText('Address 1')).toBeInTheDocument();
      expect(screen.getByText('Owner 1')).toBeInTheDocument();
    });
  });

  test('handles fetch list error', async () => {
    mock.onGet(`${apiUrl}/api/shop/list`).reply(200, { success: false });

    render(<List />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('error');
    });
  });

  test('removes a shop', async () => {
    mock.onGet(`${apiUrl}/api/shop/list`).reply(200, { success: true, data: sampleShops });
    mock.onPost(`${apiUrl}/api/shop/remove`).reply(200, { success: true, message: 'Shop removed' });

    render(<List />);

    await waitFor(() => {
      expect(screen.getByText('Shop 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText('X')[0]);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Shop removed');
    });
  });

  test('exports PDF', async () => {
    mock.onGet(`${apiUrl}/api/shop/list`).reply(200, { success: true, data: sampleShops });
    mock.onGet(`${apiUrl}/api/orders/list`).reply(200, { success: true, data: [{ detail: 'Order 1' }] });
    mock.onGet(`${apiUrl}/api/staff/list`).reply(200, { success: true, data: [{ name: 'Staff 1' }] });

    render(<List />);

    await waitFor(() => {
      expect(screen.getByText('Shop 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText('Reports')[0]);

    await waitFor(() => {
      expect(toast.error).not.toHaveBeenCalledWith('Error fetching orders list');
      expect(toast.error).not.toHaveBeenCalledWith('Error fetching orders list');
    });

    // The actual PDF creation and download cannot be easily tested in a unit test environment
    // You might consider checking that jsPDF was called correctly, but that would require more setup
  });
});