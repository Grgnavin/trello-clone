// components/RoomCard.tsx
import React from 'react';
import { Card, CardContent } from './ui/card';

type Room = {
    description: string;
    name: string;
    _id: string;
};

interface RoomCardProps {
    room: Room;
    onJoin: (id: string) => void;
}


const RoomCard: React.FC<RoomCardProps> = ({ room, onJoin }) => {
    return (
        <Card className="bg-gray-800 text-white mb-4 pt-4 mx-2 w-[400px] h-[250]">
            <CardContent>
                <h2 className="text-lg font-semibold">{room.name}</h2>
                <p className="mt-2">{room.description}</p>
            </CardContent>
        </Card>
    );
};

export default RoomCard;
