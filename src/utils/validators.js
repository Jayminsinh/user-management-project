
export function validate(formdata, users, currentEmail = null, isAdmin = null) {

    const error = {}

    if (!formdata.name.trim()) {
        error.name = "Name is required"
    } else if (formdata.name.trim().replace(/\s+/g, "").length < 4) {
        error.name = "Name must be atleast 4 characters"
    }

    if (!formdata.email) {
        error.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formdata.email)) {
        error.email = "Invalid email"
    } else if (users.some((user) => (user.email === formdata.email && user.email !== currentEmail))) {
        error.email = "Email is already registered"
    }

    if (!formdata.phone) {
        error.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formdata.phone)) {
        error.phone = "Phone number must be only 10 digits"
    }

    if (!formdata.dob.trim()) {
        error.dob = "Please enter DOB"
    }

    // if (formdata.address && formdata.address.length < 10) {
    //     error.address = "Short Address "
    // }

    if (!isAdmin) {
        if (!formdata.password) {
            error.password = "Password is required"
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
            .test(formdata.password)) {
            error.password = "Use letters, numbers & a symbol and at lest 6 characters"
        }

    }

    if (!currentEmail) {
        if (!formdata.cpassword) {
            error.cpassword = "Confirm your Password"
        } else if (!(formdata.password === formdata.cpassword)) error.cpassword = "Password mismatch"

        if (!formdata.terms) error.terms = "Please accept terms and condition"
    }

    if (!formdata.gender) error.gender = "Please select gender"


    return error;
}