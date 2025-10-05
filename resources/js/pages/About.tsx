import { Head } from '@inertiajs/react';

export default function About() {
    function handleClick() {
        alert("Omg Man");
    }
    
    return (
        <>
            <Head title="About" />
            <div className="flex flex-col min-h-screen items-center justify-center bg-green-800">
                <h1 className="text-4xl font-bold">About Us Brochachop</h1>
                <h1 className="text-4xl font-bold">Broski</h1>

                <button 
                    onClick={handleClick}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-2xl shadow-md hover:bg-blue-700 transition"
                >
                    Click Me!
                </button>
            </div>
        </>
    );
}