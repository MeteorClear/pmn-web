import React, { useState } from "react";

interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

const NoteList = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    // 노트 목록 표시

    // 목록 중 클릭한 노트 번호 추출

    return (
        <div>
            Note List...
        </div>
    )
}