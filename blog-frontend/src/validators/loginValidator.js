const isEmail = (email) =>
    String(email)
        .toLowerCase()
        .match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

const loginValidator = ({email, password}) => {
    const errors = {
        email: "",
        password: ""
    }

    if(!email){
        errors.email = "Email is Required!"
    }else if(!isEmail(email)){
        errors.email = "Invalid Email!"
    }

    if(!password){
        errors.password = "Password is Required!"
    }else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters!";
  }

    return errors;
}

export default loginValidator;
