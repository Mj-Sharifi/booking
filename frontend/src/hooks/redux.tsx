import { BookAppDispatch, BookAppStore, BookRootState } from '@/lib/store/bookStore'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector, useStore } from 'react-redux'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useBookAppDispatch: () => BookAppDispatch = useDispatch
export const useBookAppSelector: TypedUseSelectorHook<BookRootState> = useSelector
export const useBookAppStore: () => BookAppStore = useStore