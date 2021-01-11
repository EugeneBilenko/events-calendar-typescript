import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { StyledColorDropdownItem } from './styled';


const availableColors = [ 'green', 'black', 'orange', 'grey' ];

interface IProps {
  selectedColor: string;
  onColorChange: (color: string) => void
}

const ColorsDropdown = ({ selectedColor, onColorChange }: IProps) => {
  const [ isOpen, setIsOpen ] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle style={{ backgroundColor: selectedColor }}>
        Color
      </DropdownToggle>
      <DropdownMenu>
        {availableColors.map(
          color => (
            <StyledColorDropdownItem
              key={color}
              color={color}
              onClick={() => onColorChange(color)}
            />
          ),
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ColorsDropdown;
