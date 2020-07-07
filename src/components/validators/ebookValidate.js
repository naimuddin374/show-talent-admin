const ebookValidate = data => {
    let response = {}
    if (!data.category_id) {
        response.category_id = 'Please select ebook category.'
    }
    if (!data.name) {
        response.name = 'Please provide ebook name.'
    }
    if (!data.author_name) {
        response.author_name = 'Please provide author name.'
    }
    // if (!data.publication_date) {
    //     response.publication_date = 'Please provide publication date.'
    // }
    if (!data.preface) {
        response.preface = 'Please provide preface.'
    }
    if (!data.summary) {
        response.summary = 'Please provide summary.'
    }
    if (!data.author_summary) {
        response.author_summary = 'Please provide about author.'
    }
    return response
}
export default ebookValidate