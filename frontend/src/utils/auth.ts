import * as yup from "yup";
import { countries } from "./location";
import { Cookies } from "react-cookie";

const cookie = new Cookies();
const generateError = (errText: string, title?: string): string => {
  return title ? `${title}_${errText}` : errText;
};
export const validationRules = {
  username: yup
    .string()
    .trim()
    .required("username_required")
    .min(5, "username_min_limit")
    .max(20, "username_max_limit"),
  name: (name: string, required = false) => {
    return yup.lazy((value) => {
      let valid = yup
        .string()
        .trim()
        .matches(/^[A-Za-z\s]+$/, "only_letter");
      if (required || (!required && value?.length > 0)) {
        valid = valid
          .min(3, generateError("min_limit", name))
          .max(50, generateError("max_limit", name));
      }
      if (required) {
        valid = valid.required(generateError("required", name));
      }
      return valid;
    });
  },
  email: (required = false) => {
    let valid = yup.string().trim().email("email_not_valid");
    if (required) {
      valid = valid.required("email_required");
    }
    return valid;
  },
  password: (name: string = "password") =>
    yup
      .string()
      .required(generateError("required", name))
      .min(6, "password_min_limit")
      .matches(
        /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
        "must_have_letter_number"
      ),
  confirmPassword: (name: string) =>
    yup.string().oneOf([yup.ref(name)], "must_match_password"),
  select: (name: string, options: string[], required: boolean = false) => {
    let valid = yup
      .string()
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
    return yup.lazy((value) => {
      let valid = yup.string().trim().matches(/^\d+$/, "phone_only_numbers");
      if (required || (!required && value?.length > 0)) {
        valid = valid.min(10, "phone_min_limit");
      }
      if (required) {
        valid = valid.required("phone_required");
      }
      return valid;
    });
  },
  image: (
    name: string,
    supportedFormats: string[],
    maxSize: number,
    maxWidth?: number,
    maxHeight?: number,
    required = false
  ) => {
    return yup.lazy((value) => {
      let valid = yup.mixed<File>().nullable();

      if (required || (!required && !!value)) {
        valid = valid
          .test(
            "fileSize",
            generateError("size_too_large", name),
            (file?: File | null) => {
              if (!file) return !required; // Allow null/undefined when not required
              return file.size <= maxSize;
            }
          )
          .test(
            "fileFormat",
            generateError("must_be_jpg", name),
            (file?: File | null) => {
              if (!file) return !required; // Allow null/undefined when not required
              return supportedFormats.includes("." + file?.name?.split(".")[1]);
            }
          );

        if (maxWidth && maxHeight) {
          valid = valid.test(
            "fileDimensions",
            generateError("dimension_too_large", name),
            (file?: File | null) => {
              if (!file) return !required; // Allow null/undefined when not required

              const image = new Image();
              const url = URL?.createObjectURL(file);

              return new Promise<boolean>((resolve) => {
                image.onload = () => {
                  URL.revokeObjectURL(url);
                  // Check if dimensions are valid
                  if (image.width <= maxWidth && image.height <= maxHeight) {
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                };
                image.onerror = () => {
                  URL.revokeObjectURL(url);
                  resolve(false); // reject invalid images
                };
                image.src = url;
              });
            }
          );
        }
      }

      if (required) {
        valid = valid.required("image_required");
      }

      return valid.nullable(); // Allow null values when not required
    });
  },
  string: yup.string().trim(),
  number: (name?: string, required = false) => {
    let valid = yup
      .string()
      .matches(/^\d+$/, generateError("only_number", name));
    if (required) {
      valid = valid.required(generateError("required", name));
    }
    return valid;
  },
  passportNumber: (required = true) => {
    return yup.lazy((value) => {
        let valid = yup
          .string()
          .trim()
        if (required || (!required && value?.length > 0)) {
          valid = valid.matches( /^[A-Za-z0-9]*$/,"only_letter_number")
        }
        if (required) {
          valid = valid.required("passport_required");
        }
        return valid;
      });
  },
};

// Login
export const loginInitVals = {
  email: "",
  password: "",
};
export const loginVldSchema = yup.object().shape({
  email: validationRules.email(true),
  password: validationRules.password(),
});
// Register
export const registerInitVals = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};
export const registerVldSchema = yup.object().shape({
  username: validationRules.username,
  email: validationRules.email(true),
  password: validationRules.password(),
  confirm_password: validationRules.confirmPassword("password"),
});
// Change Password
export const changePassInitVals = {
  old_password: "",
  new_password: "",
  confirm_password: "",
};
export const changePassVldSchema = yup.object().shape({
  old_password: validationRules.password("old_password"),
  new_password: validationRules.password("new_password"),
  confirm_password: validationRules.confirmPassword("new_password"),
});
// Location Information
export const userLocationInitVals = {
  address: "",
  city: "",
  country: "",
  zipcode: "",
};
export const userLocationVldSchema = () => {
  // const lang = cookie.get("NEXT_LOCALE")
  const countriesValue = countries.map((cn) => cn.value);
  return yup.object().shape({
    address: validationRules.string,
    country: validationRules.select("country", countriesValue),
    city: yup.string().when("country", ([country]) => {
      if (country) {
        const selectedCountry = countries?.filter((cn) => cn.value == country);
        const citiesValue = [
          ...selectedCountry[0]?.cities.map((ci) => ci.value),
        ];
        return validationRules.select("city", citiesValue);
      } else {
        return yup.string();
      }
    }),
    zipcode: validationRules.number("zipcode"),
  });
};
// Personal Information
export const userInfoInitVals = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  birthday: "",
  about: "",
};
export const userInfoVldSchema = yup.object().shape({
  username: validationRules.username,
  firstname: validationRules.name("firstname"),
  lastname: validationRules.name("lastname"),
  email: validationRules.email(),
  phone: validationRules.phone(),
  birthday: validationRules.string,
  about: validationRules.string,
  avatar: validationRules.image(
    "avatar",
    [".jpg", ".jpeg"],
    120 * 1024,
    800,
    800
  ),
});
