import * as yup from 'yup';

const generateError = (errText: string, title?: string): string => {
    return title ? `${title}_${errText}` : errText
}
const validationRules = {
    username:(name:string)=>yup.string().trim().required("username_required").min(5, generateError("min_limit", name)).max(20, generateError("max_limit", name)),
    name: (name: string, required = false) => {
        return yup.lazy((value) => {
            let valid = yup.string().trim().matches(/^[A-Za-z\s]+$/,"only_letter")
            if (required || (!required && value?.length > 0)) {
                valid = valid.min(3, generateError("min_limit", name)).max(50, generateError("max_limit", name))

            }
            if (required) {
                valid = valid.required(generateError("required", name))
            }
            return valid
        })
    },
    email: (required = false) => {
        let valid = yup.string().trim().email("email_not_valid")
        if (required) {
            valid = valid.required("email_required")
        }
        return valid
    },
    password: yup.string().required("password_required").min(6, "password_min_limit").matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,"must_have_letter_number"),
    confirmPassword: (name: string) =>
        yup.string().oneOf([yup.ref(name)], "must_match_password"),
}
export const loginInitVals = {
    email: "",
    password: ""
}
export const loginVldSchema = yup.object().shape({
    email: validationRules.email(true),
    password: validationRules.password
})
export const registerInitVals = {
    // firstname: "",
    // lastname: "",
    username:"",
    email: "",
    password: "",
    confirm_password: ""
}
export const registerVldSchema = yup.object().shape({
    // firstname: validationRules.name("firstname", true),
    // lastname: validationRules.name("lastname", true),
    username:validationRules.username("username"),
    email: validationRules.email(true),
    password: validationRules.password,
    confirm_password: validationRules.confirmPassword("password")
})
