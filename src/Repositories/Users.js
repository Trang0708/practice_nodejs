//login
const login = async ({email, password}) => {
    console.log('login user in user repository')
}

//sign up
const signup= async ({
    username,
    email,
    password,
    phoneNumber
}) => {
    console.log('Sign up new user with: ', '\n',
                'User name: ' + username, '\n',
                'Email: ' + email, '\n',
                'Password: ' + password, '\n',
                'Phone number: ' + phoneNumber, '\n',)
}

export default {
    login,
    signup
}