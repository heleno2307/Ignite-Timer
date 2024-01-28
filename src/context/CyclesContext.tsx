import {ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { cyclesReducers } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

export interface Cycle{
    id: string;
    task: string;
    minutesAmount:number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CycleContextType{
    cycles: Cycle[]
    activeCycle: Cycle | undefined; 
    activeCycleId: string | null;
    markCurrentCycleAsFinished: ()=>void;
    amountSecondsPassed: number;
    setSecondsPassed: (seconsd:number)=>void;
    createNewCycle: (data:CreateCycleData) => void;
    InterruptCurrentCycle: ()=>void;
}

interface CreateCycleData{
    task: string;
    minutesAmount:number;
}

interface ProviderProps{
    children: ReactNode
}



export const CycleContext = createContext({} as CycleContextType);

export function CycleContextProvider({children}:ProviderProps){
    const [cyclesState,dispatch] = useReducer(cyclesReducers,{
        cycles: [],
        activeCycleId: null,
    },(initialStage)=>{
        const storageStateAtData = localStorage.getItem('@ignite-timer:cycle-state-1.0.0');
        if(storageStateAtData){
            return JSON.parse(storageStateAtData);
        }
        return initialStage;
    });
    const {activeCycleId,cycles} = cyclesState;
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
    
    const [amountSecondsPassed,setAmountSecondsPassed] = useState(()=>{
        if(activeCycle){
            return differenceInSeconds(
                new Date(),
                new Date(activeCycle.startDate)
            );
        }
        return 0;
    });

    useEffect(()=>{
        const stateJSON = JSON.stringify(cyclesState);
        localStorage.setItem('@ignite-timer:cycle-state-1.0.0',stateJSON);
    },[cyclesState])

    
    const setSecondsPassed = (seconds:number)=>{
        setAmountSecondsPassed(seconds);
    }

    const markCurrentCycleAsFinished = ()=>{
        dispatch(markCurrentCycleFinishedAction())         
    }

    const createNewCycle = (data:CreateCycleData) =>{
        const id = String(new Date().getTime());
        const newCycle:Cycle = {
           id,
           task: data.task,
           minutesAmount: data.minutesAmount,
           startDate: new Date()
        }
  
        dispatch(addNewCycleAction(newCycle))
        setAmountSecondsPassed(0);
    }
  
    const InterruptCurrentCycle =()=>{
        dispatch(interruptCurrentCycleAction())
    }

    return(
        <CycleContext.Provider value={{
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            setSecondsPassed,
            createNewCycle,
            InterruptCurrentCycle,
            cycles
            }}
        >
            {children}
        </CycleContext.Provider>
    )
}