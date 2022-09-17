/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export default function Dropdown(props: {
  placeHolder: string,
  options: string[],
  onValueChange: UseFormRegisterReturn<string>
}) {
  const {
    placeHolder,
    options,
    onValueChange,
  } = props;
  return (
    <select
      placeholder={placeHolder}
      {...onValueChange}
    >
      <option value="" disabled>{`Select ${placeHolder}`}</option>
      {
        options.map((option) => (<option key={option} value={option}>{option}</option>))
      }
    </select>
  );
}
