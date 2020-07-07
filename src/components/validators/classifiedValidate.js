const classifiedValidate = data => {
    let response = {}
    if (!data.title) {
        response.title = 'Please provide title.'
    }
    if (!data.type) {
        response.type = 'Please select type.'
    }
    if (!data.image && !data.id) {
        response.image = 'Image field is required.'
    }
    // if (!data.description) {
    //     response.description = 'Description field is required.'
    // }
    return response
}
export default classifiedValidate