export default {
  THROW_API_RESPONSE_ERROR: (state, {error, url}) => {
    let message = {name: error, url: url, errorType: 'system_error'}
    let notifId = new Date();
    let time = notifId.toLocaleTimeString();
    state.notificationMessages.apiResponseErrors.unshift(
        {name: message, type: 'error', id: time, error_type: message.errorType}
    )
  },
  LOADING: (state, payload) => {
    state.isLoading = payload;
  },
}
