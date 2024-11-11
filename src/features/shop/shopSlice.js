import { createSlice } from "@reduxjs/toolkit";
import categories from '../../data/categories.json';
import events from '../../data/events.json';


export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value:{
            categories: categories,
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
        }
    }
})

export const {setCategory} = shopSlice.actions

export default shopSlice.reducer
