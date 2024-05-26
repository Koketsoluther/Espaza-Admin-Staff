import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jsPDF } from 'jspdf';
import Manage from '../pages/Managestock/managestock'; // Adjust the import path as needed

jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));
jest.mock('jspdf', () => {
  const textMock = jest.fn();
  const saveMock = jest.fn();
  return {
    jsPDF: jest.fn(() => ({
      text: textMock,
      save: saveMock,
    })),
    __esModule: true, // This is required if you're using ES6 modules
  };
});

describe('Manage Component', () => {
  const mockData = {
    data: {
      success: true,
      data: [
        { NAME: 'Product 1', CATEGORY: 'Category 1', STOCK: 10, IMAGE: 'image1.jpg' },
        { NAME: 'Product 2', CATEGORY: 'Category 2', STOCK: 20, IMAGE: 'image2.jpg' },
      ],
    },
  };

  beforeEach(() => {
    axios.get.mockResolvedValue(mockData);
  });

  test('renders correctly and fetches product list', async () => {
    render(<Manage />);

    expect(screen.getByText('All product list')).toBeInTheDocument();
    expect(screen.getByText('Image')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  test('handles API error gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('API error'));

    render(<Manage />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error fetching the product list');
    });
  });

  /*test('exports PDF correctly', async () => {
    const { jsPDF } = require('jspdf');
    const docMock = new jsPDF();
    
    render(<Manage />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    const exportButton = screen.getByText('Export as PDF');
    fireEvent.click(exportButton);

    await waitFor(() => {
      expect(docMock.text).toHaveBeenCalledWith('Number of Products: 2', 10, 10);
      expect(docMock.text).toHaveBeenCalledWith('Product 1', 10, 20);
      expect(docMock.text).toHaveBeenCalledWith('Stock: 10', 10, 30);
      expect(docMock.text).toHaveBeenCalledWith('Product 2', 10, 40);
      expect(docMock.text).toHaveBeenCalledWith('Stock: 20', 10, 50);
      expect(docMock.save).toHaveBeenCalledWith('Manage_stock.pdf');
    });
  });*/
});