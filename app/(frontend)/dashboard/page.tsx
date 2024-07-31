'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import axios from "axios";
import RoomCard from '@/components/Roomcard';

type Room = {
    description: string;
    name: string;
    _id: string;
};


const Dashboard = (req: Request) => {
    const [rooms, setRooms] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        try {
            const FetchData = async() => {
                const res = await axios.get('/api/room', {
                    withCredentials: true
                })
                console.log(res)
                setRooms(res.data?.data)
            }
            FetchData();
        } catch (error) {
            console.log(error);
        }
    }, [])

    const handleJoin = (id: string) => {
        // Handle the join action here
        console.log(`Joining room with ID: ${id}`);
    };

    return (
            <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="space-y-4">
                {rooms.map((room) => (
                <RoomCard key={room._id} room={room} onJoin={handleJoin} />
                ))}
            </div>
            </div>
        );
    };
    
    export default Dashboard;
