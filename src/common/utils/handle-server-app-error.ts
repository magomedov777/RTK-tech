import { Dispatch } from 'redux'
import { appActions } from 'app/app.reducer'
import { ResponseType } from 'common/types/common.types'

/**
 * Handles server application errors and updates the application state accordingly.
 *
 * @template D - The type of data expected in the server response.
 * @param {ResponseType<D>} data - The response data received from the server.
 * @param {Dispatch} dispatch - The dispatch function from the Redux store.
 * @param {boolean} [isShowGlobalError=true] - Determines whether to display the error globally.
 *                                             Defaults to true.
 * @returns {void}
 */

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch,
  isShowGlobalError: boolean = true,
) => {
  if (isShowGlobalError) {
    if (data.messages.length) {
      dispatch(appActions.setAppError({ error: data.messages[0] }))
    } else {
      dispatch(appActions.setAppError({ error: 'Some error occurred' }))
    }
  }
  dispatch(appActions.setAppStatus({ status: 'failed' }))
}
