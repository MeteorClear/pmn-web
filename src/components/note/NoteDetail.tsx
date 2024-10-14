import React, { useState } from "react";

interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

const NoteDetail = (noteId: number) => {
    const [note, setNote] = useState<Note | null>(null);

    // 노트 정보 Fetch

    return (
        <div>
            Note Detail ...
        </div>
    );
};