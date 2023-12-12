import React from "react";
import Select, { StylesConfig } from "react-select";


const CustomSelect = ({
  options,
  onChange,
  isMulti,
  isClearable,
  styles,
  placeholder,
  defaultValue
}: any) => {
  const colorStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: "#f9fafb",
    }),
    options: (styles: any, { data, isDisable, isFocused, isSelected }: any) => {
      console.log("option", data, isFocused, isSelected, isDisable);
      return { ...styles };
    },
    menu: (styles: any) => {
      return { ...styles };
    },

    multiValue: (styles: any) => {
      return {
        ...styles,
        background: "#FF6B35",
        borderRadius: "3px",
        color: "white",
      };
    },
    multiValueRemove: (styles: any) => {
      return {
        ...styles,
        color: "white",
        cursor: "pointer",
        ":hover": {
          color: "white",
        },
      };
    },
    multiValueLabel: (styles: any) => {
      return { ...styles, color: "white" };
    },
    ...styles,
  };

  return (
    <Select
      defaultValue={defaultValue}
      options={options}
      onChange={onChange}
      isMulti={isMulti}
      isClearable={isClearable}
      styles={colorStyles}
      placeholder={placeholder}
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
          primary25: "#f9fafb",
          primary: "#FF6B35",
        },
      })}
    />
  );
};

export default CustomSelect;
