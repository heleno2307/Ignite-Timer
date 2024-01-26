import { useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./style";
import { differenceInSeconds } from "date-fns";

interface CountDonwProps{
   activeCycle:any;
   setCycles:any;
   activeCycleId:any
}
function CountDown({activeCycle,setCycles,activeCycleId}:CountDonwProps) {
   const [amountSecondsPassed,setAmountSecondsPassed] = useState(0);
   //transforma os minutos em segundos
   const totalSconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

   useEffect(()=>{
      let interval:number;
      if(activeCycle){
         interval = setInterval(()=> {
            const secondsDifference = differenceInSeconds(new Date(),activeCycle.startDate);

            if(secondsDifference >= totalSconds){
               setCycles((state) =>

               state.map(cycle => {
                     if(cycle.id == activeCycleId){
                        return {...cycle,finishedDate: new Date()}
                     }else{
                        return cycle;
                     }
                  })
               );
               
               setAmountSecondsPassed(totalSconds);
               clearInterval(interval);
            }else{
               setAmountSecondsPassed(secondsDifference);
            }
         
         },1000)
      }

      return () =>{
         clearTimeout(interval);
      }
   },[activeCycle,totalSconds,activeCycleId,])

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