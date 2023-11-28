import React from 'react';
import './Loader.css';

export const Loader = () => {
  return (
    <div className="loader fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
