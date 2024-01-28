
import { FormContainer, MinitesAmountInput, TaskInput } from "./styles";


import { useContext } from "react";
import { CycleContext } from "../../../../context/CyclesContext";
import { useFormContext } from "react-hook-form";


export function NewCycleForm() {
   const {activeCycle} = useContext(CycleContext);
   const {register} = useFormContext()


   return ( 

      <FormContainer>
         <label htmlFor="taks">Vou trabalhar em </label>
         <TaskInput 
            type="text" 
            id="task" 
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            {...register('task')}
            disabled={!!activeCycle}
         />

         <datalist id="task-suggestions">
            <option value="Projeto01"></option>
         </datalist>

         <label htmlFor="minutesAmount">Durante</label>
         <MinitesAmountInput 
            type="number" 
            id="minutesAmount" 
            placeholder="00"
            step={1}
            min={1}
            max={60}
            {...register('minutesAmount',{ valueAsNumber:true})}
            disabled={!!activeCycle}
         />

         <span>minutos.</span>
      </FormContainer>
   );
}