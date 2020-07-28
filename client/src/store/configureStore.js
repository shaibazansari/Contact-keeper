import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootreducer from './reducers/index'

export default function() {
    return configureStore({
        reducer : rootreducer,
        middleware : [
            ...getDefaultMiddleware()]
    })
} 