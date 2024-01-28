import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./style";
import { differenceInSeconds } from "date-fns";
import { CycleContext } from "../../../../context/CyclesContext";


function CountDown() {
   const {activeCycle,activeCycleId,markCurrentCycleAsFinished,amountSecondsPassed,setSecondsPassed} = useContext(CycleContext)
   //transforma os minutos em segundos
   const totalSconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

   useEffect(()=>{
      let interval:number;
      if(activeCycle){
         interval = setInterval(()=> {
            const secondsDifference = differenceInSeconds(
               new Date(),
               new Date(activeCycle.startDate
            ));

            if(secondsDifference >= totalSconds){
               markCurrentCycleAsFinished();
               setSecondsPassed(totalSconds);
               clearInterval(interval);
            }else{
               setSecondsPassed(secondsDifference);
            }
         
         },1000)
      }

      return () =>{
         clearTimeout(interval);
      }
   },[activeCycle,totalSconds,activeCycleId,markCurrentCycleAsFinished,setSecondsPassed]);

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

   return ( 
      <CountdownContainer>
         <span>{minutes[0]}</span>
         <span>{minutes[1]}</span>
         <Separator>:</Separator>
         <span>{seconds[0]}</span>
         <span>{seconds[1]}</span>
      </CountdownContainer>
    );
}

export default CountDown;