import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { toast } from 'react-toastify';
import Add from '../pages/Addshop/adddshop'; // Adjust the import path as needed

// Setup axios mock
const mock = new MockAdapter(axios);

// Mock the toast methods
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Add Component', () => {
  const apiUrl = 'https://us-central1-e-spazadb.cloudfunctions.net/func';

  afterEach(() => {
    mock.reset();
  });

  test('renders correctly', () => {
    render(<Add />);

    // Check for initial elements
    expect(screen.getByText('Shop Name')).toBeInTheDocument();
    expect(screen.getByText('Shop Owner Name')).toBeInTheDocument();
    expect(screen.getByText('Shop address')).toBeInTheDocument();
    //expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write address here')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(<Add />);

    const nameInput = screen.getByPlaceholderText('Enter Shop Name');
    const ownerNameInput = screen.getByPlaceholderText('Enter Owner Name');
    const addressInput = screen.getByPlaceholderText('Write address here');

    fireEvent.change(nameInput, { target: { value: 'New Shop' } });
    fireEvent.change(ownerNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });

    expect(nameInput.value).toBe('New Shop');
    expect(ownerNameInput.value).toBe('John Doe');
    expect(addressInput.value).toBe('123 Main St');
  });

  test('handles form submission successfully', async () => {
    mock.onPost(`${apiUrl}/api/shop/add`).reply(200, { success: true, message: 'Shop added successfully' });

    render(<Add />);

    const nameInput = screen.getByPlaceholderText('Enter Shop Name');
    const ownerNameInput = screen.getByPlaceholderText('Enter Owner Name');
    const addressInput = screen.getByPlaceholderText('Write address here');
    const addButton = screen.getByText('Add');

    fireEvent.change(nameInput, { target: { value: 'New Shop' } });
    fireEvent.change(ownerNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].data).toContain('New Shop');
      expect(toast.success).toHaveBeenCalledWith('Shop added successfully');
    });
  });

  test('handles form submission error', async () => {
    mock.onPost(`${apiUrl}/api/shop/add`).reply(200, { success: false });

    render(<Add />);

    const nameInput = screen.getByPlaceholderText('Enter Shop Name');
    const ownerNameInput = screen.getByPlaceholderText('Enter Owner Name');
    const addressInput = screen.getByPlaceholderText('Write address here');
    const addButton = screen.getByText('Add');

    fireEvent.change(nameInput, { target: { value: 'New Shop' } });
    fireEvent.change(ownerNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mock.history.post.length).toBe(1);
      expect(toast.error).toHaveBeenCalledWith('Error');
    });
  });
});