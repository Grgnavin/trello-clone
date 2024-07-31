'use client';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import RoomCard from '@/components/Roomcard'; // Adjust the import path as needed

// Define the types
interface UserState {
    user: {
        createdAt: string;
        email: string;
        role: string;
        updatedAt: string;
        username: string;
        __v: number;
        _id: string;
    } | null;
}

interface RootState {
    user: UserState;
}

const Dashboard: React.FC = () => {
    const [rooms, setRooms] = useState<any[]>([]);
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/room', {
                    withCredentials: true,
                });
                setRooms(res.data?.data || []); // Ensure that rooms is set correctly
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run effect only once

    const handleJoin = (id: string) => {
        // Handle the join action here
        console.log(`Joining room with ID: ${id}`);
    };

    // Destructure user properties
    const username = user?.username;

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top bar */}
            <div className="bg-gray-800 text-white p-4 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">
                    Good morning, {username || 'Loading...'}
                </h1>
            </div>
                <p className="mt-2 text-center">Here is the list of rooms you can join:</p>
            {/* Main content */}
            <div className="flex-1 p-4">
                <div className="space-y-4">
                    {rooms.map((room) => (
                        <RoomCard key={room._id} room={room} onJoin={handleJoin} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
