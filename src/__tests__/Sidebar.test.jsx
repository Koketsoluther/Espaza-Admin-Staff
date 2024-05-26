import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar'; // Adjust the import path as needed

describe('Sidebar Component', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: MemoryRouter });
  };

  test('renders correctly for staff role', () => {
    renderWithRouter(<Sidebar userRole="staff" />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Shops')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.queryByText('Add Staff')).not.toBeInTheDocument();
    expect(screen.queryByText('Manage stock')).not.toBeInTheDocument();
  });

  test('renders correctly for admin role', () => {
    renderWithRouter(<Sidebar userRole="admin" />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Shops')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Add Staff')).toBeInTheDocument();
    expect(screen.getByText('Manage stock')).toBeInTheDocument();
  });

  test('toggles products dropdown for staff', () => {
    renderWithRouter(<Sidebar userRole="staff" />);

    const productsOption = screen.getByText('Products');
    fireEvent.click(productsOption);

    expect(screen.getByText('List Products')).toBeInTheDocument();
    expect(screen.queryByText('Add Products')).not.toBeInTheDocument();
  });

  test('toggles products dropdown for admin', () => {
    renderWithRouter(<Sidebar userRole="admin" />);

    const productsOption = screen.getByText('Products');
    fireEvent.click(productsOption);

    expect(screen.getByText('List Products')).toBeInTheDocument();
    expect(screen.getByText('Add Products')).toBeInTheDocument();
  });

  test('toggles shops dropdown for staff', () => {
    renderWithRouter(<Sidebar userRole="staff" />);

    const shopsOption = screen.getByText('Shops');
    fireEvent.click(shopsOption);

    expect(screen.getByText('View all shops')).toBeInTheDocument();
    expect(screen.queryByText('Add Shops')).not.toBeInTheDocument();
  });

  test('toggles shops dropdown for admin', () => {
    renderWithRouter(<Sidebar userRole="admin" />);

    const shopsOption = screen.getByText('Shops');
    fireEvent.click(shopsOption);

    expect(screen.getByText('View all shops')).toBeInTheDocument();
    expect(screen.getByText('Add Shops')).toBeInTheDocument();
  });

  test('toggles orders dropdown for staff', () => {
    renderWithRouter(<Sidebar userRole="staff" />);

    const ordersOption = screen.getByText('Orders');
    fireEvent.click(ordersOption);

    //expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.queryByText('Assign Orders')).not.toBeInTheDocument();
  });

  test('toggles orders dropdown for admin', () => {
    renderWithRouter(<Sidebar userRole="admin" />);

    const ordersOption = screen.getByText('Orders');
    fireEvent.click(ordersOption);

    //expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Assign Orders')).toBeInTheDocument();
  });
});