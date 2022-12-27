
export default function validateInfo(formValues) {
    const { email, password, firstName, lastName } = formValues;
    let errors = {};
    if (!firstName) {
        errors.firstName = "First Name is required"
    } else if (firstName.length < 3) {
        errors.firstName = "first name must be Greater than 3"
    }
    else if (firstName.length > 10) {
        errors.firstName = "first name must be less than 10"
    }
    if (!lastName) {
        errors.lastName = "Last Name is required"
    }
    else if (lastName.length < 3) {
        errors.lastName = "Last name must be Greater than 3"
    }
    else if (lastName.length > 10) {
        errors.lastName = "Last name must be less than 10"
    }

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


    return errors;
}

