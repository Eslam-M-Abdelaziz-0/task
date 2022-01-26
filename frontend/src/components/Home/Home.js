import React from 'react';
import Order from '../Order/Order';
import './Home.css';

const Home = () => {
  return (
    <div className='home-page'>
      <h3 className='m-3 text-center justify-content-center center'>
        Home Page (All Orders Listed Here)
      </h3>
      <Order />
    </div>
  );
};

export default Home;
