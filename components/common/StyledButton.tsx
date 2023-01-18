import { Button } from '@chakra-ui/react';
import React from 'react';

interface StyledButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
  [key: string]: any;
}

const StyledButton = ({
  children,
  variant,
  onClick,
  ...props
}: StyledButtonProps) => {
  return !variant || variant === 'primary' ? (
    <Button
      size={props.size || 'md'}
      fontWeight='semibold'
      onClick={onClick}
      bg='gray.900'
      color='white'
      _hover={{
        bg: 'gray.700',
      }}
      _active={{
        bg: 'gray.800',
        transform: 'scale(1.05)',
      }}
      {...props}
    >
      {children}
    </Button>
  ) : (
    <Button
      size={props.size || 'md'}
      fontWeight='semibold'
      onClick={onClick}
      bg='white'
      color='gray.900'
      variant='outline'
      _hover={{
        bg: 'gray.50',
      }}
      _active={{
        bg: 'gray.50',
        transform: 'scale(1.05)',
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
