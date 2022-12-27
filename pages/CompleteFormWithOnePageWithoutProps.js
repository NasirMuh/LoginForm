import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from "react";

const countriesData = [
    {
        name: "Germany",
        states: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"]
    },
    {
        name: "Pakistan",
        states: ["Lahore", "Islamabad", "Gujranwala", "Karachi"]
    },
    {
        name: "France",
        states: ["Auvergne", "Bretagne", "Corse", "Centre"]
    }
];
const books = ([
    { id: 1, Name: "Php", checked: false },
    { id: 2, Name: "Reactjs", checked: false },
    { id: 3, Name: "Nextjs", checked: false },
    { id: 4, Name: "Nodejs", checked: false },

])

const CompleteFormWithOnePageWithoutProps = () => {
    // form field
    const [completeFormValue, setCompleteFormValue] = useState({
        firstName: "", lastName: "", email: "", notifications: 'Everything', message: "",
    })
    // store values here after submit button data save here
    const [completeFormValueSubmitHere, setCompleteFormValueSubmitHere] = useState([]);

    // validation errors for all form values 
    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);

    // checkbox values store here
    const [userinfo, setUserInfo] = useState({ languages: [] });

    // toggle values like true false or radio button values here
    const [toggleValue, setToggleValue] = useState(false);
    const triggerToggle = () => {
        setToggleValue(!toggleValue)
    }

    // input value change here 
    const inputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setCompleteFormValue({ ...completeFormValue, [name]: type === 'checkbox' ? checked : value })
        const { languages } = userinfo;
        if (checked && type === "checkbox") {
            setUserInfo({ languages: [...languages, value] });
        }
        else {
            setUserInfo({ languages: languages.filter((e) => e !== value) });
        }
    }
    // Cascading dropdown
    const [{ country, city }, setData] = useState({
        country: "",
        city: ""
    });
    const countries = countriesData.map((country) => (
        <option key={country.name} value={country.name}>
            {country.name}
        </option>
    ));
    const states = countriesData.find(item => item.name === country)?.states.map((city) => (
        <option key={city} value={city}>
            {city}
        </option>
    ));
    function handleCountryChange(event) {
        setData(data => ({ city: '', country: event.target.value }));
    }
    function handleStateChange(event) {
        setData(data => ({ ...data, city: event.target.value }));
    }

    // form submit event working here
    const formSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(completeFormValue))
        setDataIsCorrect(true)
    }
    // all form validation define here
    const validate = (completeFormValue) => {
        let errors = {};
        if (!completeFormValue.firstName) { errors.firstName = "First Name is required" }
        else if (completeFormValue.firstName.length < 3) { errors.firstName = "first name must be Greater than 3" }
        else if (completeFormValue.firstName.length > 10) { errors.firstName = "first name must be less than 10" }
        if (!completeFormValue.lastName) { errors.lastName = "Last Name is required" }
        else if (completeFormValue.lastName.length < 3) { errors.lastName = "Last name must be Greater than 3" }
        else if (completeFormValue.lastName.length > 10) { errors.lastName = "Last name must be less than 10" }
        if (!completeFormValue.email) { errors.email = "Email is required" }
        else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(completeFormValue.email)) { errors.email = "Email address is Invalid" }
        return errors;
    }
    useEffect(() => {
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            const updateData = {
                id: new Date().getTime().toString(),
                ...completeFormValue,
                ...userinfo,
                country,
                city,
                toggleValue
            }
            setCompleteFormValueSubmitHere([...completeFormValueSubmitHere, updateData])
            setCompleteFormValue({
                firstName: "",
                lastName: "",
                email: "",
                message: "",
                notifications: 'Everything',
            })
            setToggleValue(false)
        }
    }, [errors])

    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-2 mx-auto">
                    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Image</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">FirstName</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">LastName</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">email</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">notification</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Toggle</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Message</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Country</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">City</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Languages</th>
                                </tr>
                            </thead>
                            <tbody>
                                {completeFormValueSubmitHere?.map((formValuesData) => {
                                    const { id, firstName, lastName, email, languages, country, city, notifications, toggleValue, message } = formValuesData;
                                    return <tr key={id}>
                                        <td className="border-t-2 border-gray-200 px-4 py-1">
                                            <Image width={100} height={100} className="block mx-auto w-10 h-10 rounded-full sm:mx-0 sm:shrink-0" src="/images/Nasir.jpg" alt="Woman's Face" />
                                        </td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{firstName}</td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{lastName}</td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{email}</td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{notifications}</td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{toggleValue ? "Yes" : "No"}</td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{message}</td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{country}</td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{city}</td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{languages + ""}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>
            <div className="mt-10 sm:mt-0 bg-gray-100 px-8 py-5 rounded-lg">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                            <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form onSubmit={formSubmit} >
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                                                First name
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                                                        <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                                                        <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                                                    </svg>
                                                </span>
                                                <input type="text" name="firstName" id="firstName"
                                                    value={completeFormValue.firstName}
                                                    onChange={inputChange}
                                                    autoComplete="given-name"
                                                    placeholder='first name'
                                                    className=" w-full rounded-r-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            {errors.firstName && <p className='text-red-500 text-sm font-semibold'>{errors.firstName}</p>}
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                                                Last name
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                                                    </svg>
                                                </span>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    id="lastName"
                                                    value={completeFormValue.lastName}
                                                    onChange={inputChange}
                                                    autoComplete="family-name"
                                                    className=" w-full rounded-r-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    placeholder='last name'
                                                />
                                            </div>
                                            {errors.lastName && <p className='text-red-500 text-sm font-semibold'>{errors.lastName}</p>}
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                                                Email address
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                                                    </svg>
                                                </span>
                                                <input
                                                    id="email-address"
                                                    name="email"
                                                    type="email"
                                                    value={completeFormValue.email}
                                                    onChange={inputChange}
                                                    autoComplete="email"
                                                    className="w-full px-3 py-2 bg-white border      border-slate-300 rounded-r-md text-sm shadow-sm    placeholder-slate-400   focus:outline-none focus:border-sky-500  focus:ring-1   focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500  disabled:border-slate-200 disabled:shadow-none  invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                    placeholder="Email address"
                                                />
                                            </div>
                                            {errors.email && <p className='text-red-500 text-sm font-semibold'>{errors.email}</p>}
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                Country
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                                                    </svg>
                                                </span>
                                                <select
                                                    id="country"
                                                    name="country"
                                                    value={country}
                                                    onChange={handleCountryChange}
                                                    autoComplete="country-name"
                                                    className=" w-full rounded-r-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                    <option value="" disabled>Select Country</option>
                                                    {countries}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                City
                                            </label>
                                            <select
                                                id="city"
                                                name="city"
                                                value={city}
                                                onChange={handleStateChange}
                                                autoComplete="country-name"
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                <option value="" disabled>Select City</option>
                                                {states}
                                            </select>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                Message
                                            </label>

                                            <textarea
                                                id="message"
                                                name="message"
                                                value={completeFormValue.message}
                                                onChange={inputChange}
                                                placeholder="message"
                                                className="w-full bg-white rounded-r-md border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-6   md:mt-0">
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                            <fieldset>
                                                <legend className="sr-only">Languages</legend>
                                                <div className="text-base font-medium text-gray-900" aria-hidden="true">
                                                    By Languages
                                                </div>
                                                <div className="mt-4 space-y-4">
                                                    {
                                                        books.map((book) => {
                                                            return (<div key={book.id}>
                                                                <div className="flex items-start">
                                                                    <div className="flex h-5 items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            name="languages"
                                                                            value={book.Name}
                                                                            onChange={inputChange}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                    </div>
                                                                    <div className="ml-3 text-sm">
                                                                        <label htmlFor="comments" className="font-medium text-gray-700">
                                                                            {book.Name}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <legend className="contents text-base font-medium text-gray-900">Push Notifications</legend>
                                                <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                                                <div className="mt-4 space-y-4">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="push-everything"
                                                            name="notifications"
                                                            type="radio"
                                                            checked={completeFormValue.notifications === "Everything"}
                                                            value="Everything"
                                                            onChange={inputChange}
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Everything
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="push-email"
                                                            name="notifications"
                                                            type="radio"
                                                            value="Same as email"
                                                            checked={completeFormValue.notifications === "Same as email"}
                                                            onChange={inputChange}
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Same as email
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="push-nothing"
                                                            name="notifications"
                                                            type="radio"
                                                            value="No push notifications"
                                                            checked={completeFormValue.notifications === "No push notifications"}
                                                            onChange={inputChange}
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
                                                            No push notifications
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
                                                <input type="checkbox" checked={toggleValue} onChange={triggerToggle} id="default-toggle" className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CompleteFormWithOnePageWithoutProps


