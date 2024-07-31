// components/RoomCard.tsx
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

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
        <Card className="bg-gray-800 text-white mb-4">
        <CardContent>
            <h2 className="text-lg font-semibold">{room.name}</h2>
            <p className="mt-2">{room.description}</p>
            <Button
            className="mt-4 bg-gray-700 hover:bg-gray-600"
            onClick={() => onJoin(room._id)}
            >
            Join
            </Button>
        </CardContent>
        </Card>
    );
};

export default RoomCard;
