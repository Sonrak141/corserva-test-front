import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import SaleOrderItems from '../pages/SaleOrderItems';
import '@testing-library/jest-dom'

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SaleOrderItems Component', () => {
    beforeEach(() => {

        jest.clearAllMocks();
    });

    it('should fetch and display sale order items', async () => {

        const mockItems = [
            {
                id: 1,
                productName: 'Product 1',
                description: 'Description 1',
                quantity: 10,
                price: 100,
                sale: true,
            },
            {
                id: 2,
                productName: 'Product 2',
                description: 'Description 2',
                quantity: 5,
                price: 50,
                sale: false,
            },
        ];

        mockedAxios.get.mockResolvedValueOnce({ data: mockItems });

        render(
            <BrowserRouter>
                <SaleOrderItems />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Product 1')).toBeInTheDocument();
            expect(screen.getByText('Product 2')).toBeInTheDocument();
        });

        expect(screen.getByText('Description 1')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(screen.getByText('Yes')).toBeInTheDocument();

        expect(screen.getByText('Description 2')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('50')).toBeInTheDocument();
        expect(screen.getByText('No')).toBeInTheDocument();
    });

    it('should handle delete button click', async () => {
        const mockItems = [
            {
                id: 1,
                productName: 'Product 1',
                description: 'Description 1',
                quantity: 10,
                price: 100,
                sale: true,
            },
            {
                id: 2,
                productName: 'Product 2',
                description: 'Description 2',
                quantity: 5,
                price: 50,
                sale: false,
            },
        ];

        mockedAxios.get.mockResolvedValueOnce({ data: mockItems });
        mockedAxios.delete.mockResolvedValueOnce({});

        render(
            <BrowserRouter>
                <SaleOrderItems />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Product 1')).toBeInTheDocument();
        });

        fireEvent.click(screen.getAllByText('Delete')[0]);

        await waitFor(() => {
            expect(mockedAxios.delete).toHaveBeenCalledWith('http://localhost:3000/api/sale-order-items/1');
        });

        expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    it('should display a message when there are no items', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [] });

        render(
            <BrowserRouter>
                <SaleOrderItems />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
        });
    });
});
