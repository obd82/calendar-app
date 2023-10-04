import React from 'react';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
    const error = useRouteError()
    let errorData;
    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            errorData = {
                message: "This page doesn't exist!",
                description: "Sorry, we couldn’t find the page you’re looking for."
            }
        };
        if (error.status === 401) {
            errorData = {
                message: "You aren't authorized to see this",
                description: "Sorry, you cant access the page you're looking for."
            }
        };
        if (error.status === 503) {
            errorData = {
                message: "Looks like our API is down",
                description: "Sorry, Try again later. Until, api is down, we can't serve."
            }
        };
    }

    return (
        <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-4xl font-bold text-indigo-600">{error.status}</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{errorData.message}</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">{errorData.description}</p>
                <div className="flex items-center justify-center">
                    <Link to="calendar" className="mt-10 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back</Link>
                </div>
            </div>
        </main>
    );
};

export default ErrorBoundary;