import { themeAppDispatch, themeRootState } from '@/lib/store/store'
import { useDispatch, useSelector } from 'react-redux'


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useThemeAppDispatch = useDispatch.withTypes<themeAppDispatch>()
export const useThemeAppSelector = useSelector.withTypes<themeRootState>()