const educationValidate = data => {
    let response = {}
    if (!data.company) {
        response.company = 'Please provide company name.'
    }
    if (!data.job_title) {
        response.job_title = 'Please provide job title.'
    }
    if (!data.start_date) {
        response.start_date = 'Please provide start date.'
    }
    return response
}
export default educationValidate