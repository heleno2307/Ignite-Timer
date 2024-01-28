import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton,  StopCountdownButton} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import CountDown from "./components/CountDown";
import { zodResolver } from "@hookform/resolvers/zod"; 
import * as zod from 'zod';
import { FormProvider, useForm } from "react-hook-form";
import { CycleContext } from "../../context/CyclesContext";
import { useContext } from "react";







const newCycleFormValidationSchema = zod.object({
   task: zod.string().min(1,'Informe a tarefa'),
   minutesAmount: zod.number().min(1).max(60)
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function Home() {
   const {activeCycle,createNewCycle,InterruptCurrentCycle} = useContext(CycleContext);
   const newCycleForm= useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues:{
         task: '',
         minutesAmount: 0
      }
   });

   const {handleSubmit,watch,reset} = newCycleForm
  
   const hendlerCreateNewCycle = (data:NewCycleFormData)=>{
      createNewCycle(data);
      reset();
   }
   

   const task:string = watch('task');
   const isSubmitDisabled = !task;

   return (
      <HomeContainer>
         <form onSubmit={handleSubmit(hendlerCreateNewCycle)}>
            <FormProvider {...newCycleForm}>
               <NewCycleForm />
            </FormProvider>
               
            <CountDown />

            {activeCycle? (
               <StopCountdownButton type="button" onClick={InterruptCurrentCycle}>
                  <HandPalm size={24} />
                  Intenrromper
               </StopCountdownButton>
            ) : (
            <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
               <Play size={24} />
               Começar
            </StartCountdownButton>
            )}
         </form>
       
      </HomeContainer>
   )
}
