import { ButtonHTMLAttributes } from 'react'
import { ButtonConteiner, ButtonVariant } from './Button.styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: ButtonVariant
}

export function Button({
   variant = 'primary',
   children,
   ...props
}: ButtonProps) {
   return (
      <ButtonConteiner variant={variant} {...props}>
         {children}
      </ButtonConteiner>
   )
}
