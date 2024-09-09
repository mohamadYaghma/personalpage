import React from 'react'

export default function ButtonStyle({type , label}) {
  return (
    <div>
        <button
                type={type}
                className="btn btn--primary w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md transition duration-300 hover:-translate-y-1 shadow-xl"
              >
                {label}
              </button>
    </div>
  )
}
