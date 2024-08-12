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
    const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
    const [roomCode, setRoomCode] = useState('');
    const user = useSelector((state: RootState) => state.user.user);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get('/api/room', {
                    withCredentials: true,
                });
                setRooms(res.data?.data || []); // Ensure that rooms is set correctly
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []); 

    const handleJoin = async () => {
        if (!roomCode) {
            toast({
                title: "Code Required",
                description: "Please enter a room code.",
                variant: "destructive"
            });
            return;
        }
        try {
            const res = await axios.post('/api/room/join', { name: selectedRoom.name, code: roomCode }, { withCredentials: true });
            if (res.data.success) {
                toast({
                    title: "Joined Room",
                    description: `Successfully joined the room ${res.data.room.name}.`,
                });
                setSelectedRoom(null); 
            } else {
                toast({
                    title: "Join Failed",
                    description: res.data.message,
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error('Error joining room:', error);
            toast({
                title: "Join Failed",
                description: "Failed to join the room. Please try again.",
                variant: "destructive"
            });
        }
    };

    const handleSignInRedirect = () => {
        router.push('/signin');
    }

    const LogoutHandler = async () => {
        try {
            setLoading(true);
            const res = await axios.delete('/api/logout');
            console.log(res);
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

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top bar */}
            <div className="bg-gray-800 text-white relative p-4 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">
                    {user?.username ? `Goodmorning! ${user?.username}` : "Please Signin again"}
                </h1>
                <button onClick={LogoutHandler} className='absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded'>
                    {loading ? 'Logging out...' : 'Logout'}
                </button>
            </div>
            <p className="mt-2 text-center">Here is the list of rooms you can join:</p>
            {/* Main content */}
            <div className="flex-1 p-4">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-lg">Loading...</p>
                    </div>
                ) : rooms.length === 0 ? (
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-lg">Note: If you don't see any rooms, please logout & log in again.</p>
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
                            <RoomCard
                                key={room._id}
                                room={room}
                                // onJoin={() => {
                                //     setSelectedRoom(room);
                                //     setRoomCode('');
                                // }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;

