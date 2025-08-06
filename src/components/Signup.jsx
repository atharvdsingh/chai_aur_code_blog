import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input } from "./index";
import authservice from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Singup() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { register, handleSumbit } = useForm();
  const [error, setError] = useState();

  const singnUpHandle = async (data) => {
    setError("");
    try {
      const userData = await authservice.createAccount(data);
      if (userData) {
        const currentData = await authservice.getCurrentUser();
        if (currentData) {
          dispatch(login(currentData));
          Navigate("./");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
          <span className="inline-block w-full max-w-[100px]"></span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up for create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Aleardy have an account?&nbsp;
          <Link
            to="./login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}



        
        <form onSubmit={handleSumbit(create)} action="">
          <div className="space-y-5">
            <Input
              label="name"
              placeholder="enter your name"
              {...register("home", {
                required: true,
              })}
            />
            <Input
              label="email"
              placeholder="enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value
                    ) || "Invalid email address",
                },
              })}
            />
            <Input 
            label='password'
            type='password'
            placeholder='enter your password'
            {...register('password',{
                required:true
            })}
            
            
            />
            <Button className="w-full" type="submit"   >Create Account</Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Singup;
