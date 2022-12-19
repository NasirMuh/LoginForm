import React, { useEffect } from 'react'
import { useState } from 'react'

const UseForm = (validate) => {
    const [registrationForm, setRegistrationFrom] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })
    const [formInfo, setFromInfo] = useState([]);
    const inputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setRegistrationFrom({ ...registrationForm, [name]: type === 'checkbox' ? checked : value, })
    }
    const [errors, setErrors] = useState({});
    const formSubmit = (e) => {
        e.preventDefault();
        const updateData = {
            ...registrationForm,
        }
        setErrors(validate(registrationForm))
        setFromInfo([...formInfo, updateData])

    }


    return { formSubmit, registrationForm, inputChange, formInfo, errors }
}

export default UseForm