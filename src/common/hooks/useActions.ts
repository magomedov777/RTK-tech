/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from 'react'
import { ActionCreatorsMapObject, bindActionCreators } from 'redux'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { tasksThunks } from 'features/TodolistsList/tasks.reducer'
import { todolistsActions, todolistsThunks } from 'features/TodolistsList/todolists.reducer'
import { authThunks } from 'features/auth/auth.reducer'

const actionsAll = { ...tasksThunks, ...todolistsThunks, ...todolistsActions, ...authThunks }
type AllActions = typeof actionsAll

export const useActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(
    () => bindActionCreators<AllActions, RemapActionCreators<AllActions>>(actionsAll, dispatch),
    [dispatch],
  )
}

type ReplaceReturnType<T> = T extends (...args: any[]) => any
  ? (...args: Parameters<T>) => ReturnType<ReturnType<T>>
  : () => T

type RemapActionCreators<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: ReplaceReturnType<T[K]>
}
