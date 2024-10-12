import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { bookSlice } from "../slices/bookSlice";

const persistConfig = {
    key: 'root',
    storage,
}
const bookPersistedReducer = persistReducer(persistConfig, bookSlice.reducer)

export const bookStore = configureStore({
    reducer: {
        book: bookPersistedReducer
    }
})
export const persistedBookReducer = persistStore(bookStore)


// Get the type of our store variable
export type BookAppStore = typeof bookStore
// Infer the `RootState` and `AppDispatch` types from the store itself
export type BookRootState = ReturnType<BookAppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type BookAppDispatch = BookAppStore['dispatch']