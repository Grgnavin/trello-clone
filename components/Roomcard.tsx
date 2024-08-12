import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
import axios from "axios";

type Room = {
    description: string;
    name: string;
    _id: string;
};

interface RoomCardProps {
    room: Room;
    // onJoin: (id: string) => void;
}
const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [roomCode, setRoomCode] = useState('');

    const { toast } = useToast();
    const router = useRouter();

    const onClickHandler = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const handleJoin = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/join-room',
                { name: room.name, code: roomCode },
                { withCredentials: true }
            );
            console.log(res);
            toast({
                title: "Entered Room Successfully",
                description: res.data?.message
            })
            router.push(`/room/${res.data?.room?._id}`)
        } catch (error) {
            console.error('Error joining room:', error);
        }
        closeDialog();
    };

    return (
        <>
            <Card className="bg-gray-800 text-white mb-4 mx-2 w-[400px] h-[250px] flex flex-col relative">
                <CardContent className="flex-1 mt-2" onClick={onClickHandler}>
                    <h2 className="text-lg font-semibold">{room.name}</h2>
                    <p className="mt-2">{room.description}</p>
                </CardContent>
                <Button
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white rounded cursor-pointer"
                    onClick={onClickHandler}
                >
                    Join
                </Button>
            </Card>
            {/* Shadcn Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <DialogTitle>{`To join the ${room.name}, please enter the code below`}</DialogTitle>
                        <DialogDescription>
                            Enter the code to join.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 ">
                            Room Code:
                        </label>
                        <input
                            type="text"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    <div className="mt-4 flex justify-end">
                        <Button
                            onClick={handleJoin}
                            className="bg-blue-500 text-white rounded px-4 py-2"
                        >
                            Join
                        </Button>
                        <Button
                            type="button"
                            onClick={closeDialog}
                            className="ml-2 bg-gray-500 text-white rounded px-4 py-2"
                        >
                            Cancel
                        </Button>
                    </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default RoomCard;
