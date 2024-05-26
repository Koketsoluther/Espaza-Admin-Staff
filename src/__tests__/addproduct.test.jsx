import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { toast } from 'react-toastify';
import Add from '../pages/Addproduct/addproduct';  // Adjust the import path as needed
import { assets } from '../assets/assets'; // Adjust the import path as needed

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
  const apiUrl = 'https://thankful-hill-0b5ec3803-27.westeurope.5.azurestaticapps.net/';

  afterEach(() => {
    mock.reset();
  });

  test('renders correctly', () => {
    render(<Add />);

    // Check for initial elements
    expect(screen.getByText('Upload Image')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Product Category')).toBeInTheDocument();
    expect(screen.getByText('Product price')).toBeInTheDocument();
    expect(screen.getByText('QUANTITY')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  test('updates state on input change', () => {
    render(<Add />);

    const nameInput = screen.getByPlaceholderText('Type here');
    fireEvent.change(nameInput, { target: { value: 'Test Product' } });

    expect(nameInput.value).toBe('Test Product');
  });

  test('handles image upload', () => {
    render(<Add />);

    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const input = screen.getByText('Upload Image');

    fireEvent.change(input, { target: { files: [file] } });

    //expect(URL.createObjectURL(file)).toBeTruthy();
  });

  test('submits form successfully', async () => {
    mock.onPost(`${apiUrl}/api/products/add`).reply(200, { success: true, message: 'Product added successfully' });

    render(<Add />);

    fireEvent.change(screen.getByPlaceholderText('Type here'), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByPlaceholderText('R0.00'), { target: { value: 100 } });
    fireEvent.change(screen.getByPlaceholderText('0'), { target: { value: 10 } });
    fireEvent.change(screen.getByText('Upload Image'), {
      target: {
        files: [new File(['dummy content'], 'example.png', { type: 'image/png' })],
      },
    });

    fireEvent.submit(screen.getByText('Add'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Product added successfully');
    });

    expect(screen.getByPlaceholderText('Type here').value).toBe('Test Product');
    expect(screen.getByPlaceholderText('R0.00').value).toBe('100');
    expect(screen.getByPlaceholderText('0').value).toBe('10');
  });

  test('handles form submission error', async () => {
    mock.onPost(`${apiUrl}/api/products/add`).reply(200, { success: false, message: 'Error adding product' });

    render(<Add />);

    fireEvent.change(screen.getByPlaceholderText('Type here'), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByPlaceholderText('R0.00'), { target: { value: 100 } });
    fireEvent.change(screen.getByPlaceholderText('0'), { target: { value: 10 } });
    fireEvent.change(screen.getByText('Upload Image'), {
      target: {
        files: [new File(['dummy content'], 'example.png', { type: 'image/png' })],
      },
    });

    fireEvent.submit(screen.getByText('Add'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error adding product');
    });
  });
});