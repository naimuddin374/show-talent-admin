const educationValidate = data => {
    let response = {}
    if (!data.institute) {
        response.institute = 'Please provide an Institute.'
    }
    if (!data.degree) {
        response.degree = 'Please provide a degree.'
    }
    if (!data.passing_year) {
        response.passing_year = 'Please provide a passing year.'
    }
    return response
}
export default educationValidate