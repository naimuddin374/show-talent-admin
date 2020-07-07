const pageValidate = data => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let response = {}
    if (!data.name) {
        response.name = 'Please provide page name.'
    }
    if (!data.email) {
        response.email = 'Please provide email.'
    } else if (reg.test(data.email) === false) {
        response.email = 'Please provide a valid email.'
    }
    if (!data.contact) {
        response.contact = 'Please provide page phone number.'
    }
    if (!data.category_id) {
        response.category_id = 'Please select category.'
    }
    return response
}
export default pageValidate