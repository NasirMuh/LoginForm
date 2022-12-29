import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonalInfo from '../multiStepForm/PersonalInfo';
import SignUp from '../multiStepForm/SignUp';
import SignIn from '../multiStepForm/SignIn';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function HorizontalLinearStepper() {
    const [formValues, setFormValues] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: "",
        city: ""
    })
    const [formSubmitValue, setFormSubmitValues] = React.useState([]);

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
        setFormValues({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            country: "",
            city: ""
        })
    };
    const formSubmit = (e) => {
        
        const updateData = {
            id: new Date().getTime().toString(),
            ...formValues,
        }
        setFormSubmitValues([...formSubmitValue, updateData])
        setFormValues({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            country: "",
            city: ""
        })
    }

    return (
        <Box sx={{ width: '100%' }}>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-2 mx-auto">
                    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">FirstName</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">LastName</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">email</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">password</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">confirmPassword</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Country</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">City</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formSubmitValue?.map((formValuesData, ind) => {
                                    const { firstName, lastName, email, country, city, password, confirmPassword } = formValuesData;
                                    return <tr key={ind}>

                                        <td className="border-t-2 border-gray-200 px-4 py-3">{firstName}</td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{lastName}</td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{email}</td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{password}</td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{confirmPassword}</td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{country}</td>
                                        <td className="border-t-2 border-gray-200 px-4 py-3">{city}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {activeStep === 0 && <PersonalInfo formValues={formValues} setFormValues={setFormValues} />}
                    {activeStep === 1 && <SignUp formValues={formValues} setFormValues={setFormValues} />}
                    {activeStep === 2 && <SignIn formValues={formValues} setFormValues={setFormValues} />}

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ?
                                <Button onClick={formSubmit}>Finish</Button>
                                : 'Next'
                            }
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}