/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FilterValuesType } from 'features/TodolistsList/todolists.reducer'
import { Grid, Paper } from '@mui/material'
import { AddItemForm } from 'common/components'
import { Todolist } from './Todolist/Todolist'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn } from 'features/auth/auth.selectors'
import { selectTasks } from 'features/TodolistsList/tasks.selectors'
import { selectTodolists } from 'features/TodolistsList/todolists.selectors'
import { TaskStatuses } from 'common/enums'
import { useActions } from 'common/hooks/useActions'

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists)
  const tasks = useSelector(selectTasks)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const {
    addTask,
    addTodolist,
    changeTodolistFilter,
    changeTodolistTitle,
    fetchTodolists,
    removeTask,
    removeTodolist,
    updateTask,
  } = useActions()

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    fetchTodolists()
  }, [])

  const removeTaskCB = useCallback((taskId: string, todolistId: string) => {
    removeTask({ taskId, todolistId })
  }, [])

  const addTaskCB = useCallback((title: string, todolistId: string) => {
    addTask({ title, todolistId })
  }, [])

  const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
    updateTask({ taskId, domainModel: { status }, todolistId })
  }, [])

  const changeTaskTitleCB = useCallback((taskId: string, title: string, todolistId: string) => {
    updateTask({ taskId, domainModel: { title }, todolistId })
  }, [])

  const changeFilterCB = useCallback((filter: FilterValuesType, id: string) => {
    changeTodolistFilter({ id, filter })
  }, [])

  const removeTodolistCB = useCallback((id: string) => {
    removeTodolist(id)
  }, [])

  const changeTodolistTitleCB = useCallback((id: string, title: string) => {
    changeTodolistTitle({ id, title })
  }, [])

  const addTodolistCB = useCallback((title: string) => {
    addTodolist(title)
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm addItem={addTodolistCB} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id]

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: '10px' }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTaskCB}
                  changeFilter={changeFilterCB}
                  addTask={addTaskCB}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolistCB}
                  changeTaskTitle={changeTaskTitleCB}
                  changeTodolistTitle={changeTodolistTitleCB}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
