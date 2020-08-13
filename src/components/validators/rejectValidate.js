const rejectValidate = data => {
    let response = {}
    if (!data.reject_reason) {
        response.reject_reason = 'Please provide a reason for reaction.'
    }
    if (data.reject_reason === 'other' && !data.reject_note) {
        response.reject_note = 'Please provide a reason for reaction.'
    }

    return response
}
export default rejectValidate