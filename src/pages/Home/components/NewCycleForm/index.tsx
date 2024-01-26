import { useForm } from "react-hook-form";
import { FormContainer, MinitesAmountInput, TaskInput } from "./styles";
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"; 

const newCycleFormValidationSchema = zod.object({
   task: zod.string().min(1,'Informe a tarefa'),
   minutesAmount: zod.number().min(1).max(60)
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
   const {register,handleSubmit,watch,reset} = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues:{
         task: '',
         minutesAmount: 0
      }
   });
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