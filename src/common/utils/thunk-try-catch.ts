import { AppDispatch, AppRootStateType } from 'app/store'
import { handleServerNetworkError } from 'common/utils/handle-server-network-error'
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { appActions } from 'app/app.reducer'
import { ResponseType } from 'common/types'

/**

Executes a thunk with try-catch error handling and dispatches appropriate actions.
@param {BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | ResponseType>} thunkAPI - The base Thunk API object.
@param {() => Promise<T>} logic - A function representing the asynchronous logic to be executed.
@returns {Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>>} A Promise that resolves to the result of the logic function or a rejected Promise with the value returned by thunkAPI.rejectWithValue.
*/

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | ResponseType>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  try {
    return await logic()
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(appActions.setAppStatus({ status: 'idle' }))
  }
}
