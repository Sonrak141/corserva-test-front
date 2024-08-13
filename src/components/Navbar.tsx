import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="flex flex-row justify-around mt-10">
    <a href="/" className="hover:text-red-400">
      Home
    </a>

    <a href="/sale-order-items" className="hover:text-red-400">
      Sale Order Items
    </a>
  </nav>
);

export default Navbar;
