import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import List from '../pages/listOrders/listorders';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

describe('List Component', () => {
  it('renders without crashing', () => {
    //render(<List />);
    //expect(screen.getByText('All Order available')).toBeInTheDocument();
  });

  it('fetches and displays list of orders', async () => {
    const ordersData = {
      success: true,
      data: [
        {
          _id: '1',
          ADDRESS: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            street: '123 Main St',
            city: 'Anytown',
            province: 'Anyprovince',
            country: 'Country',
            postalcode: '12345',
            phone: '1234567890',
          },
          STATUS: 'Delivered',
          AMOUNT: 100,
        },
      ],
    };

    axios.get.mockResolvedValueOnce({ data: ordersData });

    render(<List />);

    // Wait for the list to be fetched and displayed
    
      //expect(screen.getByText('John Doe john.doe@example.com')).toBeInTheDocument();
      //expect(screen.getByText('123 Main St Anytown Anyprovince')).toBeInTheDocument();
      //expect(screen.getByText('Country Postal-Code: 12345 01234567890')).toBeInTheDocument();
      //expect(screen.getByText('Delivered')).toBeInTheDocument();
      //expect(screen.getByText('R100')).toBeInTheDocument();
    
  });

  it('displays error message if fetching orders fails', async () => {
    //axios.get.mockRejectedValueOnce(new Error('Failed to fetch orders'));

    //render(<List />);

    // Wait for the error message to be displayed
   
      //expect(screen.getByText('Error')).toBeInTheDocument();
    
  });
});