export default function validateInfo(registrationForm) {
    let errors = {};
    if (!registrationForm.firstName.trim()) {
        errors.firstName = "First Name is required"
    } else if (registrationForm.firstName.length < 3) {
        errors.firstName = "first name must be Greater than 3"
    }
    else if (registrationForm.firstName.length > 10) {
        errors.firstName = "first name must be less than 10"
    }
    if (!registrationForm.lastName.trim()) {
        errors.lastName = "Last Name is required"
    }
    else if (registrationForm.lastName.length < 3) {
        errors.lastName = "Last name must be Greater than 3"
    }

    if (!registrationForm.email) {
        errors.email = "Email is required"
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(registrationForm.email)) {
        errors.email = "Email address is Invalid"
    }
    return errors;
}