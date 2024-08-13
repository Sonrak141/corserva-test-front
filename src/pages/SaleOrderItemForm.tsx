import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import Header from '../components/Header';

interface Order {
  productName: string;
  description: string;
  quantity: number;
  price: number;
  sale: boolean;
}

const SaleOrderItemForm = () => {
  const [item, setItem] = useState<Order>({
    productName: '',
    description: '',
    quantity: 0,
    price: 0,
    sale: false,
  });
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/sale-order-items/${id}`)
      .then((response) => setItem(response.data))
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  const formik = useFormik({
    initialValues: {
      productName: '',
      description: '',
      quantity: 0,
      price: 0,
      sale: false,
    },
    validationSchema: Yup.object({
      productName: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      quantity: Yup.number().min(1).required('Required'),
      price: Yup.number().min(0.01).required('Required'),
      sale: Yup.boolean(),
    }),
    onSubmit: (values) => {
      const request = id
        ? axios.put(`http://localhost:3000/api/sale-order-items/${id}`, values)
        : axios.post('http://localhost:3000/api/sale-order-items', values);

      request
        .then(() => history('/sale-order-items'))
        .catch((error) => console.error('Error submitting form:', error));
    },
  });

  return (
    <div>
      <Header />
      {id ? (
        <h2 className="text-center font-bold text-2xl mt-10">Update order</h2>
      ) : (
        <h2 className="text-center font-bold text-2xl mt-10">
          Create new Oder
        </h2>
      )}

      {id ? (
        <table className="mt-10 w-[80%] mx-auto border-collapse">
          <thead>
            <tr>
              <th className="border border-[#dddddd] padding-[8px]">
                Product Name
              </th>
              <th className="border border-[#dddddd] padding-[8px]">
                Description
              </th>
              <th className="border border-[#dddddd] padding-[8px]">
                Quantity
              </th>
              <th className="border border-[#dddddd] padding-[8px]">Price</th>
              <th className="border border-[#dddddd] padding-[8px]">Sale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-[#dddddd] padding-[8px]">
                {item.productName}
              </td>
              <td className="border border-[#dddddd] padding-[8px]">
                {item.description}
              </td>
              <td className="border border-[#dddddd] padding-[8px]">
                {item.quantity}
              </td>
              <td className="border border-[#dddddd] padding-[8px]">
                {item.price}
              </td>
              <td className="border border-[#dddddd] padding-[8px]">
                {item.sale ? (
                  <div className=" bg-green-500 w-full h-full">Yes</div>
                ) : (
                  <div className=" bg-red-500 w-full h-full">No</div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <></>
      )}
      {id ? (
        <h2 className="font-semibold text-lg w-[80%] mx-auto mt-20">
          New values
        </h2>
      ) : (
        <></>
      )}
      <form
        onSubmit={formik.handleSubmit}
        className=" flex flex-col w-full mx-auto items-center"
      >
        <div className="flex flex-col w-[80%]">
          <label className="font-bold mt-1" htmlFor="productName">
            Product Name
          </label>
          <input
            id="productName"
            name="productName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.productName}
            className=" bg-[#efdada] rounded-md mt-2 py-1 text-[#3a3a3a]"
          />
          {formik.touched.productName && formik.errors.productName ? (
            <div className="mt-1 text-red-500 text-sm uppercase">
              {formik.errors.productName}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col w-[80%]">
          <label className="font-bold mt-1" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
            className=" bg-[#efdada] rounded-md mt-2 py-1 text-[#3a3a3a]"
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="mt-1 text-red-500 text-sm uppercase">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col w-[80%]">
          <label className="font-bold mt-1" htmlFor="quantity">
            Quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.quantity}
            className=" bg-[#efdada] rounded-md mt-2 py-1 text-[#3a3a3a]"
          />
          {formik.touched.quantity && formik.errors.quantity ? (
            <div className="mt-1 text-red-500 text-sm uppercase">
              {formik.errors.quantity}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col w-[80%]">
          <label className="font-bold mt-1" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.price}
            className=" bg-[#efdada] rounded-md mt-2 py-1 text-[#3a3a3a]"
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="mt-1 text-red-500 text-sm uppercase">
              {formik.errors.price}
            </div>
          ) : null}
        </div>
        <div className="my-5">
          <label className="font-bold mt-1 mr-5" htmlFor="sale">
            Sale
          </label>
          <input
            id="sale"
            name="sale"
            type="checkbox"
            onChange={formik.handleChange}
            checked={formik.values.sale}
            className=""
          />
        </div>
        <button
          className=" bg-blue-400 py-2 px-4 rounded-md  text-white hover:bg-blue-600 duration-300 transition-all"
          type="submit"
        >
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default SaleOrderItemForm;
