import React from 'react';
import Register from '../components/Register';
import Login from '../components/Login';

const LoginPage = () => {
    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen">
            {/* Header Section */}
            <header className="bg-indigo-600 shadow-md p-6 w-full">
                <h1 className="font-bold text-3xl text-center text-white">
                    Aimleap - Tasks App
                </h1>
                <p className="mt-1 text-center text-white">Assignment Submission</p>
            </header>

            <main className="flex justify-center items-center mt-10 px-4 w-full">
                <div className="flex md:flex-row flex-col gap-8 bg-white shadow-lg p-8 rounded-lg w-full max-w-4xl">
                    {/* Register Component */}
                    <div className="w-full md:w-1/2">
                        <Register />
                    </div>

                    <div className="md:block border-gray-300 hidden border-l"></div>

                    {/* Login Component */}
                    <div className="w-full md:w-1/2">
                        <Login />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
