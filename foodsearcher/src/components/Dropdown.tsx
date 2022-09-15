import React from 'react';

export default function Dropdown(props: {
  placeHolder: string,
  options: string[],
  value: string,
  onValueChange: (optionValue: string) => void
}) {
  const {
    placeHolder,
    options,
    value,
    onValueChange,
  } = props;
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onValueChange(event.target.value);
  }
  return (
    <select
      name={placeHolder}
      value={value}
      placeholder={placeHolder}
      onChange={handleChange}
    >
      <option value="" disabled>{`Select ${placeHolder}`}</option>
      {
        options.map((option) => (<option key={option} value={option}>{option}</option>))
      }
    </select>
  );
}
