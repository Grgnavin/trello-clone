'use client';
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const Room = () => {
    const router = useRouter();
    const CreateTask = () => {
        router.push('/task');
    }   

    return (
        <div>
            <Button onClick={CreateTask}>Create Task</Button>
        </div>
    )
}

export default Room