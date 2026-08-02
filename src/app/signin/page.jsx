"use client"
import { authClient } from '@/lib/auth-client';
import { Check } from '@gravity-ui/icons';
import {Form, Button, Card, Input, Label } from '@heroui/react';
import { useRouter } from 'next/navigation';
import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignInPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, } = useForm();
const onSubmit = async(data)=>{
setLoading(true);
try{
const {data:signInData, error: signInError } = await authClient.signIn.email({
name: data.name,
email: data.email,
password: data.password,
callbackURL: "/",
});
if(signInError){
toast.error(signInError.message || "Failed to sign up");
return;
};
toast.success("SignIn successful!.")
router.push("/");
}catch(error){
console.error(error);
toast.error("SignIn Failed.")
}finally{
setLoading(false);
}
}
    return (
<Card className="border border-red-500 bg-red-200 mx-auto w-[420px] py-8 px-6 mt-10 shadow-lg rounded-2xl">
              <h1 className="text-3xl font-bold mb-6 text-black">Sign In</h1>
        
              <Form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Name Field */}
                <div className="flex flex-col gap-1">
                  <Label className="text-xs text-black font-semibold">Name</Label>
                  <Input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Enter your name"
                    type="text"
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>
        
                {/* Email Field */}
                <div className="flex flex-col gap-1">
                  <Label className="text-xs text-black font-semibold">Email</Label>
                  <Input
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address"
                      }
                    })}
                    placeholder="john@example.com"
                    type="email"
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>
                        
                  {/* Password */}
                  
                    <Label className="text-xs text-black font-semibold">Password</Label>
                    <div className="relative">
                      <Input
                        {...register("password", { required: "Password is required" })}
                        type={isShowPassword ? "text" : "password"}
                        placeholder="Password"
                      />
<button type="button" onClick={() => setIsShowPassword(!isShowPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-slate-400">
                        {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                  
        
                {/* Submit Button */}
                <div className="flex gap-3 mt-4">
    <Button className='flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold h-11 rounded-xl shadow-lg' type="submit" isLoading={loading}>
        <Check /> {loading ? "Signing In..." : "SignIn"}
                  </Button>
                </div>
              </Form>
            </Card>
    );
};

export default SignInPage;