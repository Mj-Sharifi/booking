import * as yup from 'yup';

const generateError = (errText: string, title?: string): string => {
    return title ? `${title}_${errText}` : errText
}
const validationRules = {
    username: yup.string().trim().required("username_required").min(5, "username_min_limit").max(20, "username_max_limit"),
    name: (name: string, required = false) => {
        return yup.lazy((value) => {
            let valid = yup.string().trim().matches(/^[A-Za-z\s]+$/, "only_letter")
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
    password: (name: string = "password") => yup.string().required(generateError("required", name)).min(6, "password_min_limit").matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, "must_have_letter_number"),
    confirmPassword: (name: string) =>
        yup.string().oneOf([yup.ref(name)], "must_match_password"),
    select: (name: string, options: string[], required: boolean = false) => {
        let valid = yup.string()
            .default("")
            .oneOf(
                [...options, ...(required ? [] : [""])],
                generateError("invalid_option", name)
            );
        if (required) {
            valid.required(generateError("required", name));
        }
        return valid;

    },
    phone: (required = false) => {
        return yup.lazy(value => {
            let valid = yup.string().trim()
            if (required || (!required && value?.length > 0)) {
                valid = valid.min(10, "phone_min_limit")
            }
            if (required) {
                valid = valid.required("phone_required")
            }
            return valid
        })

    },
    string: yup.string().trim(),
    number: yup.number(),

}

// Login
export const loginInitVals = {
    email: "",
    password: ""
}
export const loginVldSchema = yup.object().shape({
    email: validationRules.email(true),
    password: validationRules.password()
})
// Register
export const registerInitVals = {
    username: "",
    email: "",
    password: "",
    confirm_password: ""
}
export const registerVldSchema = yup.object().shape({
    username: validationRules.username,
    email: validationRules.email(true),
    password: validationRules.password(),
    confirm_password: validationRules.confirmPassword("password")
})
// Change Password
export const changePassInitVals = {
    old_password: "",
    new_password: "",
    confirm_password: ""
}
export const changePassVldSchema = yup.object().shape({
    old_password: validationRules.password("old_password"),
    new_password: validationRules.password("new_password"),
    confirm_password: validationRules.confirmPassword("new_password")
})
// Location Information
export const userLocationInitVals = {
    address: "",
    city: "",
    country: "",
    zipcode: ""
}
export const userLocationVldSchema = yup.object().shape({
    address: validationRules.string,
    city: validationRules.select("city", []),
    country: validationRules.select("country", []),
    zipcode: validationRules.number
})
// Personal Information
export const userInfoInitVals = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    birthday: "",
    about: ""
}
export const userInfoVldSchema = yup.object().shape({
    username: validationRules.username,
    firstname: validationRules.name("firstname"),
    lastname: validationRules.name("lastname"),
    email: validationRules.email(),
    phone: validationRules.phone(),
    birthday: validationRules.string,
    about: validationRules.string,
})