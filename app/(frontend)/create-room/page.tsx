'use client';
import { setId } from '@/app/redux/roomSlice';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast'
import { createRoomSchema } from '@/Schemas/Userschema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as z from "zod";

const CreateRoom = () => {
    const { toast } = useToast();
    const router = useRouter();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const[isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof createRoomSchema>>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            name: "",
            description: "",
            code: "",
        }
    });

    const onSubmit = async (data: z.infer<typeof createRoomSchema>) => {
        try {
            setIsSubmitting(true);
            const res = await axios.post('/api/room', data, {
                headers: {
                    'Content-type': "application/json"
                },
                withCredentials: true
            })
            const roomId = res.data?.data?._id;
            toast({
                title: "Secure room created",
                description: res.data?.message
            })
            dispatch(setId(roomId));
            router.push(`/room/${roomId}`)
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Can't create room",
                description: error?.response?.message,
            });
            console.error("Error in creating room: ", error);
        }finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                    Create a secure room
                </h1>
                <p className="mb-4"></p>
            </div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name:</FormLabel>
                                <Input 
                                    placeholder="Name" 
                                    {...field} 
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setName(e.target.value);
                                    }}
                                />
                                <FormMessage />
                            </FormItem>
                            
                        )}
                    />
                    <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description:</FormLabel>
                                    <Textarea 
                                        placeholder="Type your description here."
                                        {...field}
                                        className="mt-1"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    <FormField
                        name="code"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Code</FormLabel>
                                <Input 
                                    type="text" 
                                    placeholder="create a code" 
                                    {...field} 
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setCode(e.target.value);
                                    }}
                                />
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
                            'Create Room'
                        )}
                    </Button>
                </form>
            </FormProvider>
        </div>
    </div>
    )
}

export default CreateRoom