import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    initialState:[],
    name:'cart',
    reducers:{
        addItem(state,action){
            state.push(action.payload)
        },
        deleteItem(state,action){
            const index = state.findIndex(element=>element===action.payload)
            state.splice(index,1)
        },
        removeItem(state,action){
            while(state.length>0){
                state.pop()
            }
        }
    }
})

export const {addItem, deleteItem, removeItem} = cartSlice.actions
export default cartSlice.reducer