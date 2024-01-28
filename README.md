# Ignite-timer

Esse projeto consiste em criar um relógio de pomodoro,de forma que o usuário tenha acesso a todos os ciclos anteriores, e seus status.



## Inicialização:
- Inicialização da aplicação.
```
  npm run dev
```
## Bibliotecas Usadas

- Zod : https://zod.dev/
- react-hook-form : https://react-hook-form.com/ts
- @hookform/resolvers : https://www.npmjs.com/package/@hookform/resolvers#zod
- date-fns : https://date-fns.org/
- react-router-dom : https://reactrouter.com/en/main
- immer: https://immerjs.github.io/immer/
- styled-components : https://styled-components.com/

## Exemplo de como usar o useReducer

- Step 1
```js
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
```
- Step 2

```js
export function cyclesReducers(state:CyclesState,action:any){
    switch(action.type){
        case ActionTypes.ADD_NEW_CYCLE:
            return produce(state,draft =>{
                draft.cycles.push(action.payload.newCycle);
                draft.activeCycleId = action.payload.newCycle.id;
            });
        case ActionTypes.INTERRUPT_CURRENT_CYCLE:{

            const currentCycleIndex = state.cycles.findIndex(cycle =>{
                return cycle.id == state.activeCycleId;
            });

            if(currentCycleIndex < 0){
                return state;
            }
            return produce(state,draft =>{
                draft.activeCycleId = null;
                draft.cycles[currentCycleIndex].interruptedDate = new Date();
            })
        }
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:{
      
            const currentCycleIndex = state.cycles.findIndex(cycle =>{
                return cycle.id == state.activeCycleId;
            });

            if(currentCycleIndex < 0){
                return state;
            }

            return produce(state,draft =>{
                draft.activeCycleId = null;
                draft.cycles[currentCycleIndex].finishedDate = new Date();
            })
        }
        default:
            return state;
```

- Step 3

```ts
export enum ActionTypes{
    ADD_NEW_CYCLE =  'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED'
}

export function addNewCycleAction(newCycle:Cycle){
    return {
        type: ActionTypes.ADD_NEW_CYCLE,
        payload:{
            newCycle,
        }
    }
}
export function markCurrentCycleFinishedAction(){
    return {
        type:ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
    }
}
export function interruptCurrentCycleAction(){
    return {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    }
}
```
