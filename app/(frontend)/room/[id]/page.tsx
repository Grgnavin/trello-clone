'use client';
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useToast } from '@/components/ui/use-toast';


const Room = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();
    const CreateTask = () => {
        router.push('/task');
    }   

    const LogoutHandler = async () => {
        try {
            setLoading(true);
            const res = await axios.delete('/api/logout');
            toast({
                title: "Logout Successfully",
                description: "User logged out"
            });
            router.push('/signin');
        } catch (error) {
            console.log(error);
            toast({
                title: "Can't logout",
                description: "Internal server error"
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

    },[])

    return (
        <div className='min-h-screen flex flex-col'>
        <div className="bg-gray-800 text-white top-0 left-0 w-full h-16 p-4 flex items-center justify-between relative z-10">
            <div className="flex-1 flex justify-center">
                <h1 className="text-2xl font-bold">
                    Welcome to Your WorkFlow Room
                </h1>
            </div>
            <button
                onClick={LogoutHandler}
                className='px-4 py-2 bg-blue-500 text-white rounded'
            >
                {loading ? 'Exiting Room...' : 'Exit room'}
            </button>
        </div>
        <div className="pt-16 flex-1"> {/* Add padding-top to account for the fixed header */}
            <Button   
                onClick={CreateTask}
                className='fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white rounded'>
                    Create Task
            </Button>
        </div>
    </div>
    )
}

export default Room