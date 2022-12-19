import React, { useState } from 'react'
import useForm from './useForm'
import Image from 'next/image'
import validate from './validateInfo'

const FormSignUp = () => {
    const { formSubmit, registrationForm, inputChange, formInfo, errors } = useForm(validate);
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
                                </tr>
                            </thead>
                            <tbody>
                                {formInfo?.map((finfo, inde) => {
                                    const { firstName, lastName, } = finfo;
                                    return <tr key={inde}>
                                        <td className="border-t-2 border-gray-200 px-4 py-1">
                                            <Image width={100} height={100} className="block mx-auto w-10 h-10 rounded-full sm:mx-0 sm:shrink-0" src="/images/Nasir.jpg" alt="Woman's Face" />
                                        </td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{firstName}</td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{lastName}</td>
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
                        <form onSubmit={formSubmit}>
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                                First name
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                value={registrationForm.firstName}
                                                onChange={inputChange}
                                                autoComplete="given-name"
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                            {errors.firstName && <p className='text-red-500 text-sm font-semibold'>{errors.firstName}</p>}
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                                Last name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                value={registrationForm.lastName}
                                                onChange={inputChange}
                                                autoComplete="family-name"
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                            {errors.lastName && <p className='text-red-500 text-sm font-semibold'>{errors.lastName}</p>}

                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email-address" className="sr-only">
                                                Email address
                                            </label>
                                            <input
                                                id="email-address"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                placeholder="Email address"
                                            />
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
    )
}

export default FormSignUp