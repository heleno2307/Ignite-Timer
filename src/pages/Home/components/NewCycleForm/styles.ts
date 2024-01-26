import { styled } from "styled-components";

export const FormContainer = styled.div`
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 0.5rem;
   color: ${(props) => props.theme["gray-100"]};
   font-size: 1.125rem;
   font-weigth: bold;
   flex-wrap: wrap;
`;
const BaseInput = styled.input`
   background: transparent;
   height: 2.5rem;
   border: 0;
   border-bottom: 2px solid ${(props) => props.theme["gray-500"]};
   font-weight: bold;
   font-size: 1.125rem;
   padding: 0 0.5rem;
   color: ${(props) => props.theme["gray-100"]};

   &::placeholder{
      color: ${(props) => props.theme["gray-100"]};
   }

   &:focus{
      box-shadow: none;
      border-color: ${(props) => props.theme["green-500"]};
   }
`
export const TaskInput = styled(BaseInput)`
flex: 1;

   &[type="text"]::-webkit-calendar-picker-indicator {
      display: none !important;
   }
`;

export const MinitesAmountInput = styled(BaseInput)`
   width: 4rem;
`