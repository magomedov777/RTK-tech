import { Dispatch } from 'redux'
import axios, { AxiosError } from 'axios'
import { appActions } from 'app/app.reducer'

/**
 * Handles network errors that occur during server communication and updates the application state accordingly.
 *
 * @param {unknown} e - The error object thrown during the network request.
 * @param {Dispatch} dispatch - The dispatch function from the Redux store.
 * @returns {void}
 */

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : 'Some error occurred'
    dispatch(appActions.setAppError({ error }))
  } else {
    dispatch(appActions.setAppError({ error: `Native error ${err.message}` }))
  }
  dispatch(appActions.setAppStatus({ status: 'failed' }))
}
