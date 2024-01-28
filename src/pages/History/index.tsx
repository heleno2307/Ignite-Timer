import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CycleContext } from "../../context/CyclesContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function History() {
   const {cycles} = useContext(CycleContext);
   
   return (
      <HistoryContainer>
         <h1>Meu histórico</h1>

         <HistoryList>
            <table>
               <thead>
                  <tr>
                     <th>Tarefa</th>
                     <th>Duração</th>
                     <th>Início</th>
                     <th>Status</th>
                  </tr>
               </thead>
               <tbody>
                  {cycles.map(cycle =>(
                     <tr key={cycle.id}>
                        <td>{cycle.task}</td>
                        <td>{cycle.minutesAmount} minutos</td>
                        <td>{formatDistanceToNow(new Date(cycle.startDate),{
                           addSuffix: true,
                           locale: ptBR
                        })}</td>
                        <td>
                           {cycle.finishedDate && (
                              <Status statuscolor="green">Concluído</Status>
                           )}
                           {cycle.interruptedDate && (
                              <Status statuscolor="red">Interrompido</Status>
                           )}
                             {(!cycle.interruptedDate && !cycle.finishedDate) && (
                              <Status statuscolor="yellow">Em andamento</Status>
                           )}
                         
                        </td>
                     </tr>
                  ))}
              
               </tbody>
            </table>
         </HistoryList>
      </HistoryContainer> 
   )
}
