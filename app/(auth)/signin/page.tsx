'use client';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ApiResponse } from '@/Schemas/ApiResponse';
import { UserSigninSchema } from '@/Schemas/Userschema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import * as z  from 'zod';

const Signin = () => {
    const { toast } = useToast();
    const router = useRouter();

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof UserSigninSchema>>({
        resolver: zodResolver(UserSigninSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit =async (data: z.infer<typeof UserSigninSchema>) => {
        try {
            setIsSubmitting(true);
            const res = await axios.post<ApiResponse>('/api/signin', data, {
                headers:{
                'Content-Type':'application/json'
            },
            withCredentials: true
        })
        console.log(res);
        toast({
            title: "Success",
            description: res.data?.message
        })
        router.push('/');
        } catch (error) {
            toast({
                variant: "destructive",
                title: "SigninFailed",
                description: error?.response?.data?.message,
            })
            console.error("Error in signup of user: ", error);
        } finally {
            setIsSubmitting(false);

        }
    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Trello: The Ultimate Task Manager
                    </h1>
                    <p className="mb-4">Unlock Your Productivity– Sign In Now!</p>
                </div>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                'Signin'
                            )}
                        </Button>
                    </form>
                </FormProvider>
                <div className="text-center mt-4">
                    <p>
                        Haven't Signup yet?{' '}
                        <Link href="/signin" className="text-blue-600 hover:text-blue-800">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signin