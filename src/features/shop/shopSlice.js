import { createSlice } from "@reduxjs/toolkit";
import events from '../../data/events.json';


export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value:{
            events: events,
            categorySelected: "",
            eventsFilteredByCategory: [],
            eventId: null
        }
    },
    reducers: {
        setCategory: (state, action) =>{
            state.value.eventsFilteredByCategory = events.filter(ev => ev.category.toLowerCase() === action.payload.toLowerCase())
            state.value.categorySelected = action.payload
        },
        setEventId: (state,action) => {
            state.value.eventId = action.payload 
        }
    }
})

export const {setCategory, setEventId} = shopSlice.actions

export default shopSlice.reducer
