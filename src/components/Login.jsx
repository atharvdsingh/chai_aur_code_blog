import React from 'react'
import { useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
import { login as authLogin, login } from '../store/authSlice'
import { Button, Input } from './index'
import authservice from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Login() {

    const dispatch = useDispatch()
    const navigator = useNavigate()
    const { register, handleSumbit } = useForm()
    const [error, setErroe] = useState(false)

    const loginHandle = async (data) => {
        setErroe("")
        try {
            const session = await authservice.login(data)
            if (session) {
                const userData = await authservice.getCurrentUser()
                if (data) dispatch(authLogin(userData))
                navigator('./')
            }
        } catch (error) {
            console.log('appwrite loginhandle', error)
            setErroe(error.message)

        }
    }

    return (
        <>
            <div className='flex items-center justify-center w-full'  >
                <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 ' > </div>

                <div className='mb-2 flex justify-center ' >

                    <span className='w-full inline-block max-w-[100px] ' >LOGO</span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight' > Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    don&apos;t have any account?&nbsp;
                    <Link to="/signup"

                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >Sign up</Link>
                </p >
                {error && <p className='text-red-600 mt-8 text-center' >{error}</p>}
                <form onSubmit={handleSumbit(login)} className='mt-8' >
                    <div className="space-y-5">
                        <Input
                            label='email'
                            placeholder='enter your email'
                            type='email'
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Invalid email address",
                                }
                            })}

                        />
                        <Input

                            label='passoword'
                            placeholder='enter your password'
                            type='password'
                            {...register('passoword', {
                                required: true
                            })}


                        />
                        <Button type='submit' className='w-full'  > sign in</Button>


                    </div>

                </form>

            </div>
        </>
    )
}

export default Login
