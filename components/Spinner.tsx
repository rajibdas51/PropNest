'use client';
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
const override = {
  display: 'block',
  margin: '100px auto',
};
const Spinner = () => {
  return (
    <ClipLoader color='#6366F1' cssOverride={override} size={150}></ClipLoader>
  );
};

export default Spinner;
