import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonConteinerProps {
   variant: ButtonVariant
}

const buttonVariants = {
   primary: 'purple',
   secondary: 'orange',
   danger: 'red',
   success: 'green',
}

export const ButtonConteiner = styled.button<ButtonConteinerProps>`
   width: 100px;
   height: 40px;
   border-radius: 4px;
   border: 0;
   margin: 8px;
   background-color: ${(props) => props.theme['green-500']};

   /* ${(props) => {
      return css`
         background-color: ${buttonVariants[props.variant]};
      `
   }} */
`
