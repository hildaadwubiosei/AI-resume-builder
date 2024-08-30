import { SignIn } from "@clerk/clerk-react"
// eslint-disable-next-line no-unused-vars
import React from "react"

function SignInPage() {
    return (
        <div className='flex justify-center my-20 items-center'>
            <SignIn/>
        </div>
    )
}

export default SignInPage