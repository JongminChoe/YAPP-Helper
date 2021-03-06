import * as React from "react";
import { useState, FormEvent } from "react";
import "./style.scss";

interface TextInputProps {
  width?: string;
  placeholder?: string;
  defaultValue?: string;
  onChangeFunc?: (value: string) => void;
  className?: string;
}

const TextInput = ({ width, placeholder, onChangeFunc, className, defaultValue }: TextInputProps) => {
  const onChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    if (onChangeFunc) {
      onChangeFunc((event.target as HTMLInputElement).value);
    }
  };

  return (
    <input
      className={`yapp-text-input ${className ? className : ""}`}
      type="text"
      onChange={onChangeHandler}
      placeholder={placeholder}
      defaultValue={defaultValue ? defaultValue : ""}
      style={{ width }}
    />
  );
};

export default TextInput;
