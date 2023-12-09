import React from "react";
import Select from "react-select";

const CustomSelect = ({
  options,
  onChange,
  isMulti,
  isClearable,
  styles,
  placeholder,
}: any) => {
  const colorStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: "white",
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
      options={options}
      onChange={onChange}
      isMulti={isMulti}
      isClearable={isClearable}
      styles={colorStyles}
      placeholder={placeholder}
    />
  );
};

{
    /* 
   contoh penggunaan komponen 
   
   const pilihan = [
      { value: "makanan", label: "Makanan" },
      { value: "minuman", label: "Minuman" },
      { value: "barang", label: "Barang" },
      { value: "kelistrikan", label: "Kelistrikan" },
    ];
            <CustomSelect
                options={pilihan}
                onChange={handleChange}
                isMulti
                isClearable
                placeholder="Pilih Kategori"
              /> 
          */
  }
  
export default CustomSelect;
