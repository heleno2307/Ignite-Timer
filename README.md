# Styled Components

Esse é um exemplo de como usar algumas funcionalidades da biblioteca styled-components.

## Instalação:
- instalação da biblioteca.
```
  npm i styled-components
```
- instalação dos @Types.
```
  npm i @types/styled-components
```



## Exemplo de como criar um componente HTML, o elemento utilizado no exemplo foi um button.

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Utilizando os themes:

```js
import styled,{css} from "styled-components";

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonConteinerProps {
   variant: ButtonVariant
}

const buttonVariants = {
   primary: 'purple',
   secondary: 'orange',
   danger: 'red',
   success: 'green'
}

export const ButtonConteiner = styled.button <ButtonConteinerProps>`
   width: 100px;
   height: 40px;
   background-color: ${props => props.theme.primary};
`
```
- Utilizando Props:

```js
import styled,{css} from "styled-components";

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonConteinerProps {
   variant: ButtonVariant
}

const buttonVariants = {
   primary: 'purple',
   secondary: 'orange',
   danger: 'red',
   success: 'green'
}

export const ButtonConteiner = styled.button <ButtonConteinerProps>`
   width: 100px;
   height: 40px;
   ${props => {
      return css`
         background-color: ${buttonVariants[props.variant]}
      `
   }} 
`
```
## exemplo de criação de um theme e a utilização de Theme provider.
- Criação do Theme:

```js
export const defaultTheme = {
   primary: 'red'
}
```
- Utilização do Theme Provider

```js
import { Button } from './components/Button/Button'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
        <Button/>
        <Button variant='primary'/>
        <Button variant='danger'/>
        <Button variant='success'/>
        <Button variant='secondary'/>
    </ThemeProvider>
  )
}

export default App
```
## Criação e utilização do GlobalStyles:

- Criação do GlobalStyles

```js
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
   *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
   }

   body{
      background-color: #333;
      color: #fff;
   }
`;
```
- Utilização do GlobalStyles
  
```js
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
        <GlobalStyle/>
    </ThemeProvider>
  )
}

export default App
```
