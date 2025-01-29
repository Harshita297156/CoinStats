import React from 'react';
import { styled } from '@mui/material/styles';  // Using `styled` for MUI v5

// Define the SelectButton as a functional component using styled API
const SelectButton = ({ children, selected, onClick }) => {
  // Create a styled component with the same styles
  const Button = styled('span')(({ theme, selected }) => ({
    border: '1px solid gold',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'Montserrat',
    cursor: 'pointer',
    backgroundColor: selected ? 'gold' : '',
    color: selected ? 'black' : '',
    fontWeight: selected ? 700 : 500,
    '&:hover': {
      backgroundColor: 'gold',
      color: 'black',
    },
    width: '22%',
    margin: 5,
  }));

  return (
    <Button onClick={onClick} selected={selected}>
      {children}
    </Button>
  );
};

export default SelectButton;
