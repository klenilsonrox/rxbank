import React from 'react';

const Input = ({value,setState,...props}) => {
  return (
    <>
     <div className='flex flex-col'>
     <input className='bg-blue-50 py-3 rounded-md mt-4 pl-4 outline-none'value={value}onChange={({ target }) => setState(target.value)}{...props}/>
     </div>
   
             

    </>
  );
};

export default Input;