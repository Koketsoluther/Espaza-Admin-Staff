import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { toast } from 'react-toastify';
import ListStaff from '../pages/listStaff/liststaff';  // Adjust the import path as needed

// Setup axios mock
const mock = new MockAdapter(axios);

// Mock the toast methods
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('ListStaff Component', () => {
  const apiUrl = 'https://us-central1-e-spazadb.cloudfunctions.net/func';
  
  const sampleStaff = [
    { _id: '1', NAME: 'John', SURNAME: 'Doe', SHOP: 'Shop 1', ID: '123', EMAIL: 'john.doe@example.com' },
    { _id: '2', NAME: 'Jane', SURNAME: 'Doe', SHOP: 'Shop 2', ID: '456', EMAIL: 'jane.doe@example.com' },
  ];

  afterEach(() => {
    mock.reset();
  });

  test('renders correctly', async () => {
    mock.onGet(`${apiUrl}/api/staff/list`).reply(200, { success: true, data: sampleStaff });

    render(<ListStaff />);

    // Check for initial elements
    expect(screen.getByText('Staff Memebers')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Surname')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();

    // Wait for the API call to complete and check for list items
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      //expect(screen.getByText('Doe')).toBeInTheDocument();
      expect(screen.getByText('Shop 1')).toBeInTheDocument();
      expect(screen.getByText('123')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    });
  });

  test('handles fetch list error', async () => {
    mock.onGet(`${apiUrl}/api/staff/list`).reply(200, { success: false });

    render(<ListStaff />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error');
    });
  });

  test('displays multiple staff members', async () => {
    mock.onGet(`${apiUrl}/api/staff/list`).reply(200, { success: true, data: sampleStaff });

    render(<ListStaff />);

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });
  });

});