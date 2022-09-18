/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DropDownProps } from '../types/models';

export default function Dropdown(props: DropDownProps) {
  const {
    placeHolder,
    options,
    formRegister,
  } = props;

  return (
    <select
      placeholder={placeHolder}
      {...formRegister}
    >
      <option value="" disabled>{`Select ${placeHolder}`}</option>
      {
        options.map((option) => (<option key={option} value={option}>{option}</option>))
      }
    </select>
  );
}
