import { useState, useEffect } from 'react'

const UseForm = (allValidationPages) => {
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [formValuesSubmit, setFormValuesSubmit] = useState([]);
    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);

    const inputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormValues({ ...formValues, [name]: type === 'checkbox' ? checked : value, })
    }
    const formSubmit = (e) => {
        e.preventDefault();
        setErrors(allValidationPages(formValues))
        setDataIsCorrect(true)
    }
    useEffect(() => {
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            const updateData = {
                id: new Date().getTime().toString(),
                ...formValues,
            }
            setFormValuesSubmit([...formValuesSubmit, updateData])
        }
    }, [errors])
    return { formSubmit, formValues, inputChange, formValuesSubmit, errors }
}

export default UseForm