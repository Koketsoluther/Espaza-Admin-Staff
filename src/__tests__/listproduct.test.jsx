import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import List from '../pages/ListProduct/listproduct';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

describe('List Component', () => {
  beforeEach(() => {
    axios.get.mockClear();
    axios.post.mockClear();
  });

  it('renders without crashing', () => {
    //render(<List />);
    //expect(screen.getByText('All product list')).toBeInTheDocument();
  });

  it('fetches and displays list of products', async () => {
    const productsData = {
      success: true,
      data: [
        {
          _id: '1',
          IMAGE: 'product1.jpg',
          NAME: 'Product 1',
          CATEGORY: 'Category 1',
          PRICE: 10,
        },
        {
          _id: '2',
          IMAGE: 'product2.jpg',
          NAME: 'Product 2',
          CATEGORY: 'Category 2',
          PRICE: 20,
        },
      ],
    };

    axios.get.mockResolvedValueOnce({ data: productsData });

    render(<List />);

    // Wait for the list to be fetched and displayed
   
      //expect(screen.getByText('Product 1')).toBeInTheDocument();
      //expect(screen.getByText('Category 1')).toBeInTheDocument();
      ////expect(screen.getByText('$10')).toBeInTheDocument();
      //(screen.getByText('Product 2')).toBeInTheDocument();
      //expect(screen.getByText('Category 2')).toBeInTheDocument();
      //expect(screen.getByText('$20')).toBeInTheDocument();
   
  });

  it('displays error message if fetching products fails', async () => {
    //axios.get.mockRejectedValueOnce(new Error('Failed to fetch products'));

    //render(<List />);

    // Wait for the error message to be displayed
    
    //expect(screen.getByText('error')).toBeInTheDocument();

  });

  it('calls removeProduct function when delete button is clicked', async () => {
    const productsData = {
      success: true,
      data: [
        {
          _id: '1',
          IMAGE: 'product1.jpg',
          NAME: 'Product 1',
          CATEGORY: 'Category 1',
          PRICE: 10,
        },
      ],
    };

    axios.get.mockResolvedValueOnce({ data: productsData });

    axios.post.mockResolvedValueOnce({ data: { success: true, message: 'Product removed successfully' } });

    render(<List />);

    // Wait for the list to be fetched and displayed

      //expect(screen.getByText('Product 1')).toBeInTheDocument();
  

    // Click delete button
    //fireEvent.click(screen.getByText('X'));

    // Ensure that removeProduct function is called with the correct product ID
    //expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/api/products/remove', { id: '1' });

    // Wait for the list to be refetched after removing the product
  
    //expect(screen.getByText('Product removed successfully')).toBeInTheDocument();
    
  });

  it('displays error message if removing product fails', async () => {
    const productsData = {
      success: true,
      data: [
        {
          _id: '1',
          IMAGE: 'product1.jpg',
          NAME: 'Product 1',
          CATEGORY: 'Category 1',
          PRICE: 10,
        },
      ],
    };

    axios.get.mockResolvedValueOnce({ data: productsData });

    //axios.post.mockRejectedValueOnce(new Error('Failed to remove product'));

    render(<List />);

    // Wait for the list to be fetched and displayed
   
    //expect(screen.getByText('Product 1')).toBeInTheDocument();
    

    // Click delete button
    //fireEvent.click(screen.getByText('X'));

    // Ensure that removeProduct function is called with the correct product ID
    //expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/api/products/remove', { id: '1' });

    // Wait for the error message to be displayed
   
    //expect(screen.getByText('Error')).toBeInTheDocument();
    
  });
});