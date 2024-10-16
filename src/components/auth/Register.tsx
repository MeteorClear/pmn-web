import React from "react";

interface UserRegisterRequest {
    email: string;
    password: string;
    usernsme: string;
};

const Register = () => {

    return (
        <div>
            <p>Register</p>
            <form>
                <input />
                <input />
                <input />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};