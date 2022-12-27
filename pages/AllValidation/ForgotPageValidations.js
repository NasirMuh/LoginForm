
export default function ForgotPageValidation(formValues) {
    const { email, password ,confirmPassword} = formValues; 
    let errors = {};
    if (!email) {
        errors.email = "Email is required"
    }
    else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
        errors.email = "Email address is Invalid"
    }
    if (!password) {
        errors.password = "Password is required"
    } else if (password.length < 3) {
        errors.password = "Password must be Greater than 3"
    }
    if (!confirmPassword) {
        errors.confirmPassword = "Confirm Password is required"
    } else if (confirmPassword.length < 3) {
        errors.confirmPassword = "Password must be Greater than 3"
    }
    return errors;
}