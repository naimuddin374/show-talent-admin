const loginValidate = data => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let response = {}
    if (!data.email) {
        response.email = 'Please provide your email.'
    } else if (reg.test(data.email) === false) {
        response.email = 'Please provide a valid email.'
    }
    if (!data.password) {
        response.password = 'Please provide password.'
    }
    return response
}
export default loginValidate