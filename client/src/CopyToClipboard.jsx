import React from 'react';
import { FaRegCopy } from "react-icons/fa6";

const CopyToClipboard = ({ ids }) => {
  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id).then(() => {
      console.log(`Copied ID: ${id}`);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <>
    <div className='flex flex-col w-1/3'>
    <h3>Click on an ID to copy it to the clipboard:</h3>
        {ids.map(id => (
            <button className='flex justify-center items-center gap-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' key={id} onClick={() => copyToClipboard(id)}>{id} <FaRegCopy/> </button>
        ))}
    </div>
    </>
  );
};

export default CopyToClipboard;
