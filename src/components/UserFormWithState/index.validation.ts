import * as yup from 'yup'

export const UserValidations = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email("E-mail invalid").required('E-mail is required'),
    password: yup.string().min(8, 'Minimum 8 caracters').max(20, 'Max 20 caracteres'),
    age: yup.number().typeError('Age must be a number').required('Age is required'),
    phone: yup.string().matches(new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'), "Format Phone number incorrect")
})