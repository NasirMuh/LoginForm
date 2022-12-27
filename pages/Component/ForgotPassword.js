import React from 'react'
import Image from 'next/image'
import UseForm from '../useForm'

import ForgotPageValidations from '../AllValidation/ForgotPageValidations'

const ForgotPassword = () => {
    const { formSubmit, formValues, inputChange, formValuesSubmit, errors } = UseForm(ForgotPageValidations);
    const { email, password, confirmPassword } = errors;
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-2 mx-auto">
                    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Image</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Email</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Password</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Remember Me</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formValuesSubmit?.map((formValuesData) => {
                                    const { id, email, password, confirmPassword } = formValuesData;
                                    return <tr key={id}>
                                        <td className="border-t-2 border-gray-200 px-4 py-1">
                                            <Image width={100} height={100} className="block mx-auto w-10 h-10 rounded-full sm:mx-0 sm:shrink-0" src="/images/Nasir.jpg" alt="Woman's Face" />
                                        </td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{email}</td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{password + ""}</td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{confirmPassword + ""}</td>

                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <form className="mt-8 space-y-6" onSubmit={formSubmit} >
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input value={formValues.email}
                        onChange={inputChange} name="email" type="email" id="email1" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" />
                    {email && <p className='text-red-500 text-sm font-semibold'>{email}</p>}

                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input value={formValues.password}
                        onChange={inputChange} name="password" type="password" id="password1" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                    {password && <p className='text-red-500 text-sm font-semibold'>{password}</p>}

                </div>
                <div className="mb-6">
                    <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                    <input value={formValues.confirmPassword} name="confirmPassword"
                        onChange={inputChange} type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                    {confirmPassword && <p className='text-red-500 text-sm font-semibold'>{confirmPassword}</p>}

                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input id="terms" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                    </div>
                    <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
            </form>

        </>
    )
}

export default ForgotPassword