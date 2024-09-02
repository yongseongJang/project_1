import { ReactNode } from 'react';
import styled from 'styled-components';

const CustomButton = styled.button<{ width: string; height: string }>`
  border: 1px solid;
  border-radius: 8px;
  border-color: #007aff33;
  background-color: white;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: pointer;

  &:hover {
    background-color: #007aff2e;
    border-color: #007aff2e;
  }
`;

interface ButtonProps {
  style: {
    width: string;
    height: string;
  };
  children: ReactNode;
}

const Button = ({ style, children }: ButtonProps) => {
  return (
    <CustomButton {...style} type={'button'}>
      {children}
    </CustomButton>
  );
};

export default Button;
