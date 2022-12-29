import { useState } from 'react'

// const GPTChat = () => {
//     const [items, setItems] = useState([
//         { id: 1, name: 'Item 1' },
//         { id: 2, name: 'Item 2' },
//         { id: 3, name: 'Item 3' }
//     ])

//     // Create a new item
//     const handleCreateItem = (name) => {
//         setItems([
//             ...items,
//             {
//                 id: items.length + 1,
//                 name
//             }
//         ])
//     }

//     // Read all items
//     const handleReadItems = () => {
//         console.log(items)
//     }

//     // Update an item
//     const handleUpdateItem = (id, name) => {
//         setItems(items.map(item => {
//             if (item.id === id) {
//                 return {
//                     ...item,
//                     name
//                 }
//             }
//             return item
//         }))
//     }

//     // Delete an item
//     const handleDeleteItem = (id) => {
//         setItems(items.filter(item => item.id !== id))
//     }

//     return (
//         <div>
//             <button onClick={() => handleCreateItem('New Item')}>Create</button>

//             <ul>
//                 {items.map(item => (
//                     <li key={item.id}>{item.name}
//                         <button onClick={handleReadItems}>Read</button>
//                         <button onClick={() => handleUpdateItem(item.id, 'Updated Item')}>Update</button>
//                         <button onClick={() => handleDeleteItem(item.id)}>Delete</button>

//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }


const GPTChat = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const validateForm = () => {
        const errors = {}

        if (!formState.name) {
            errors.name = 'Name is required'
        }

        if (!formState.email) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
            errors.email = 'Email is invalid'
        }

        if (!formState.password) {
            errors.password = 'Password is required'
        } else if (formState.password.length < 8) {
            errors.password = 'Password must be at least 8 characters'
        }

        if (!formState.confirmPassword) {
            errors.confirmPassword = 'Confirm password is required'
        } else if (formState.password !== formState.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match'
        }

        setFormState({
            ...formState,
            errors
        })

        return Object.keys(errors).length === 0
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (validateForm()) {
            // Submit form
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formState.errors.name ? 'border-red-500' : ''}`}
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formState.name}
                    onChange={handleInputChange}
                />
                {formState.errors.name && (
                    <p className="text-red-500 text-xs italic mt-2">{formState.errors.name}</p>
                )}
            </div>
        </form>
    )
}


export default GPTChat