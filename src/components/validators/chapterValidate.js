const chapterValidate = data => {
    let response = {}
    if (!data.name) {
        response.name = 'Please provide chapter name.'
    }
    if (!data.description) {
        response.description = 'Please provide description.'
    }
    return response
}
export default chapterValidate