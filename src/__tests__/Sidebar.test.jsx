import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
describe('Sidebar Component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    )

    // Check if the sidebar options are rendered
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Shops')).toBeInTheDocument()
    expect(screen.getByText('Orders')).toBeInTheDocument()
    expect(screen.getByText('Add Staff')).toBeInTheDocument()
    expect(screen.getByText('Manage stock')).toBeInTheDocument()
  })

  it('toggles the Products dropdown when clicked', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    )

    // Check that dropdown is not visible initially
    expect(screen.queryByText('List Products')).not.toBeInTheDocument()
    expect(screen.queryByText('Add Products')).not.toBeInTheDocument()

    // Click to open the dropdown
    fireEvent.click(screen.getByText('Products'))
    expect(screen.getByText('List Products')).toBeInTheDocument()
    expect(screen.getByText('Add Products')).toBeInTheDocument()

    // Click again to close the dropdown
    fireEvent.click(screen.getByText('Products'))
    expect(screen.queryByText('List Products')).not.toBeInTheDocument()
    expect(screen.queryByText('Add Products')).not.toBeInTheDocument()
  })

  it('toggles the Shops dropdown when clicked', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    )

    // Check that dropdown is not visible initially
    expect(screen.queryByText('Add Shops')).not.toBeInTheDocument()
    expect(screen.queryByText('View all shops')).not.toBeInTheDocument()

    // Click to open the dropdown
    fireEvent.click(screen.getByText('Shops'))
    expect(screen.getByText('Add Shops')).toBeInTheDocument()
    expect(screen.getByText('View all shops')).toBeInTheDocument()

    // Click again to close the dropdown
    fireEvent.click(screen.getByText('Shops'))
    expect(screen.queryByText('Add Shops')).not.toBeInTheDocument()
    expect(screen.queryByText('View all shops')).not.toBeInTheDocument()
  })

  it('toggles the Orders dropdown when clicked', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    )

    // Check that dropdown is not visible initially
    expect(screen.queryByText('Assign Orders')).not.toBeInTheDocument()
    //expect(screen.queryByText('Orders')).not.toBeInTheDocument()

    // Click to open the dropdown
    //fireEvent.click(screen.getByText('Orders'))
    //expect(screen.getByText('Assign Orders')).toBeInTheDocument()
    //expect(screen.getByText('Orders')).toBeInTheDocument()

    // Click again to close the dropdown
    //fireEvent.click(screen.getByText('Orders'))
    //expect(screen.queryByText('Assign Orders')).not.toBeInTheDocument()
    //expect(screen.queryByText('Orders')).not.toBeInTheDocument()
  })
})