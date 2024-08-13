import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return (
    <div>
      <h1 className="text-center font-bold text-4xl mt-10">
        Welcome to the CRUD Manager
      </h1>
      <Navbar />
    </div>
  );
};

export default Header;
