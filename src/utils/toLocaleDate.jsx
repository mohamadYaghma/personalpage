import React from 'react'

export default function toLocaleDate(data) {
const options = {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};
  return new Date(data).toLocaleDateString("fa-IR" , options);
  
}

export function toLocalDateStringShort(data) {
  return new Date(data).toLocaleDateString("fa-IR");
}
