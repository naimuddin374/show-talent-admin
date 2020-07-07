const ebookReviewValidate = data => {
    let response = {}
    if (!data.comment) {
        response.comment = 'Please provide review comment.'
    }
    if (!data.rating) {
        response.rating = 'Please select rating.'
    }
    return response
}
export default ebookReviewValidate