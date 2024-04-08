import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    initialState:[],
    name:'cart',
    reducers:{
        addItem(state,action){
            state.push(action.payload)
        }
    }
})

export const {addItem} = cartSlice.actions
export default cartSlice.reducer