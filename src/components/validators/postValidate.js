const postValidate = data => {
    let response = {}
    if (!data.category_id) {
        response.category_id = 'Please select category.'
    }
    if (data.type === 2 && !data.newslink) {
        response.image = 'News link field is required.'
    }
    if (data.type === 4 && !data.video) {
        response.image = 'Video link field is required.'
    }
    if (data.type === 5 && !data.image && !data.id) {
        response.image = 'Image field is required.'
    }
    return response
}
export default postValidate