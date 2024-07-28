'use client';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast, useToast } from '@/components/ui/use-toast';
import { UserSignupSchema } from '@/Schemas/Userschema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form';
import * as z from "zod";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { ApiResponse } from '@/Schemas/ApiResponse';

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const[isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof UserSignupSchema>>({
        resolver: zodResolver(UserSignupSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
        }
    });

    const onSubmit = async (data: z.infer<typeof UserSignupSchema>) => {
        try {
            setIsSubmitting(true);
            const res = await axios.post<ApiResponse>('/api/signup', data,{
                headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true});
            toast({
                title: "Success",
                description: "User created successfully",
            });
            router.push('/signin');
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Signup failed.",
                description: error?.response?.data?.message,
            });
            console.error("Error in signup of user: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Trello: The Ultimate Task Manager
                    </h1>
                    <p className="mb-4">Unlock Your Productivity– Sign Up Now!</p>
                </div>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <Input 
                                        placeholder="username" 
                                        {...field} 
                                        onChange={(e) => {
                                            field.onChange(e)
                                            setUsername(e.target.value)
                                        }}
                                        />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Input placeholder="email" {...field} 
                                    onChange={(e) => {
                                        field.onChange(e)
                                        setEmail(e.target.value)
                                    }}/>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" placeholder="password" {...field} 
                                    onChange={(e) => {
                                        field.onChange(e)
                                        setPassword(e.target.value)
                                    }}/>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full' disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Signup'
                            )}
                        </Button>
                    </form>
                </FormProvider>
                <div className="text-center mt-4">
                    <p>
                        Already a member?{' '}
                        <Link href="/signin" className="text-blue-600 hover:text-blue-800">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};


export default SignupForm