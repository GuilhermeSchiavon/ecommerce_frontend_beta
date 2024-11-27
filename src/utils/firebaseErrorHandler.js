const firebaseErrorHandler = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorCode === 'auth/email-already-in-use') return 'The email address is already in use by another account.';
    else if (errorCode === 'auth/wrong-password') return 'Incorrect email or password.'
    
    console.log(`Error code: ${errorCode}`);
    console.log(`Error message: ${errorMessage}`);
    return 'Something went wrong. Please try again later'
}

export default firebaseErrorHandler;