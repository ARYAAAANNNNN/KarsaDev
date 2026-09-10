import React from 'react';
import { Megaphone } from 'lucide-react';

export default function AnnouncementBar({ text }) {
    if (!text) return null;
    return (
        <div className="announcement-bar">
            <Megaphone size={16} />
            <span>{text}</span>
        </div>
    );
}