import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const SaleOrderItems = () => {
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/sale-order-items')
            .then((response) => setItems(response.data))
            .catch((error) => console.error('Error fetching items:', error));
    }, []);

    return (
        <div>
            <Header />
            <div className='flex w-[90%] justify-center flex-col items-center mx-auto'>

                <h2 className='font-bold text-center text-2xl mt-10'>Sale Order Items</h2>
                <a href="/sale-order-items/new" className=' bg-blue-400 py-2 px-4 rounded-md mt-10 text-white hover:bg-blue-600 duration-300 transition-all'>Create New Item</a>
                <table className='mt-10 w-[80%] mx-auto border-collapse'>
                    <thead>
                        <tr>
                            <th className='border border-[#dddddd] padding-[8px]'>Product Name</th>
                            <th className='border border-[#dddddd] padding-[8px]'>Description</th>
                            <th className='border border-[#dddddd] padding-[8px]'>Quantity</th>
                            <th className='border border-[#dddddd] padding-[8px]'>Price</th>
                            <th className='border border-[#dddddd] padding-[8px]'>Sale</th>
                            <th className='border border-[#dddddd] padding-[8px]'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length !== 0 ? (items.map((item) => (
                            <tr key={item.id}>
                                <td className='border border-[#dddddd] padding-[8px]'>{item.productName}</td>
                                <td className='border border-[#dddddd] padding-[8px]'>{item.description}</td>
                                <td className='border border-[#dddddd] padding-[8px]'>{item.quantity}</td>
                                <td className='border border-[#dddddd] padding-[8px]'>{item.price}</td>
                                <td className='border border-[#dddddd] padding-[8px]'>{item.sale ? (
                                    <div className=' bg-green-500 w-full h-full'>Yes</div>
                                ) : (
                                    <div className=' bg-red-500 w-full h-full'>No</div>
                                )}</td>
                                <td className='border border-[#dddddd] padding-[8px] flex justify-around items-center'>

                                    <Link to={`/sale-order-items/${item.id}/edit`} className=' bg-blue-400 py-2 px-4 rounded-md  text-white hover:bg-blue-600 duration-300 transition-all'>Edit</Link>
                                    <button
                                        className=' bg-red-400 py-2 px-4 rounded-md  text-white hover:bg-red-600 duration-300 transition-all'
                                        onClick={() =>
                                            axios
                                                .delete(`http://localhost:3000/api/sale-order-items/${item.id}`)
                                                .then(() => setItems(items.filter((i) => i.id !== item.id)))
                                                .catch((error) =>
                                                    console.error('Error deleting item:', error),
                                                )
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))) : (
                            <tr>

                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SaleOrderItems;
