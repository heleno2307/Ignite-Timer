import { HandPalm, Play } from "phosphor-react";

import { 
   HomeContainer, 
   StartCountdownButton, 
   StopCountdownButton, 
} from "./styles";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import CountDown from "./components/CountDown";




interface Cycle{
   id: string;
   task: string;
   minutesAmount:number;
   startDate: Date;
   interruptedDate?: Date;
   finishedDate?: Date;
}

export function Home() {
   const [cycles,setCycles] = useState<Cycle[]>([]);
   const [activeCycleId,setActiveCycleId] = useState <string | null>(null);
  
   //encontra um ciclo ativo
   const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
 

   

   const hendleCreateNewCycle = (data:NewCycleFormData) =>{
      const id = String(new Date().getTime());
      const newCycle:Cycle = {
         id,
         task: data.task,
         minutesAmount: data.minutesAmount,
         startDate: new Date()
      }

      setCycles(state => [...state,newCycle]);
      setActiveCycleId(id);
      setAmountSecondsPassed(0)
      reset();
   }
   const hendlerInterruptCycle =()=>{
      setCycles((state) => 
      state.map(cycle =>{
            if(cycle.id == activeCycleId){
               return {...cycle,interruptedDate: new Date()}
            }else{
               return cycle;
            }
         })
      );

      setActiveCycleId(null);
   }



   //retorna o segundos atual
   const currentSeconds = activeCycle ? totalSconds - amountSecondsPassed : 0;

   //quantidade de minutos
   const minutesAmount = Math.floor(currentSeconds / 60);

   //segundos restantes
   const secondsAmount = currentSeconds % 60;

   const minutes = String(minutesAmount).padStart(2,'0');
   const seconds = String(secondsAmount).padStart(2,'0');

   useEffect(()=>{
      if(activeCycle){
         document.title = `${minutes}:${seconds}`
      }
   },[minutes,seconds])

   const task:string = watch('task');
   const isSubmitDisabled = !task;

   return (
      <HomeContainer>
         <form onSubmit={handleSubmit(hendleCreateNewCycle)}>
            <NewCycleForm />
            <CountDown />
            {activeCycle? (
               <StopCountdownButton type="button" onClick={hendlerInterruptCycle}>
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
