const ebookCoverPhotoValidate = data => {
    let response = {}
    if (!data.front_image) {
        response.front_image = 'Please provide front side image.'
    }
    if (!data.back_image) {
        response.back_image = 'Please provide back side image.'
    }
    return response
}
export default ebookCoverPhotoValidate