import React from 'react'

export default function TextFild({ label, name, value, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <input
        autoComplete="off"
        className="textField__input"
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
