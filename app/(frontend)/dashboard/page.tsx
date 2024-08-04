'use client';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import RoomCard from '@/components/Roomcard'; 
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
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
    const [loading, setLoading] = useState(true);
    const user = useSelector((state: RootState) => state.user.user);
    const router = useRouter();
    const {toast} = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await axios.get('/api/room', {
                    withCredentials: true,
                });
                setRooms(res.data?.data || []); // Ensure that rooms is set correctly
            } catch (error) {
                console.error('Error fetching data:', error);
            }finally{
                setLoading(false)
            }
        };
        fetchData();
    }, []); // Empty dependency array to run effect only once

    const handleJoin = (id: string) => {
        console.log(`Joining room with ID: ${id}`);
    };

    // Destructure user properties
    const username = user?.username;

    const handleSignInRedirect = () => {
        console.log("Redirecting to sign-in page");
        router.push('/signin');
    }

    const LogoutHandler = async () => {
        try {
            setLoading(true);
            const res = await axios.delete('/api/logout');
            toast({
                title: "Logout Successfully",
                description: "User loggedOut"
            })
        } catch (error) {
            console.log(error);
            toast({
                title: "Can't logout",
                description: "Internal server error"
            })
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top bar */}
            <div className="bg-gray-800 text-white relative p-4 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">
                    Good morning, {username || 'Loading...'}
                </h1>
                <button onClick={LogoutHandler} className='absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded'>Logout</button>
            </div>
            <p className="mt-2 text-center">Here is the list of rooms you can join:</p>
            {/* Main content */}
            <div className="flex-1 p-4">
                {rooms.length === 0 ? (
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-lg">Note: If uh don't see any rooms. Please Logout & login to use the rooms</p>
                        <button 
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={handleSignInRedirect}
                        >
                            Go to Sign In
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {rooms.map((room) => (
                            <RoomCard key={room._id} room={room} onJoin={handleJoin} />
                        ))}
                    </div> 
                )}
            </div>
        </div>
    );
}
    export default Dashboard;

