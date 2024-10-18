import React, { useState } from "react";

interface User {
    id: number;
    email: string;
    username: string;
    createdAt: string;
};

interface UpdateUserProps {
    userId: number;
};

const UpdateUser = ({ userId }: UpdateUserProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    return (
        <div>

        </div>
    );
};

export default UpdateUser;