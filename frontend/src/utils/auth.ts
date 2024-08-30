import * as yup from 'yup';
export const loginInitVals = {
    email: "",
    password: ""
}
export const loginVldScheme = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
})
export const registerInitVals = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: ""
}