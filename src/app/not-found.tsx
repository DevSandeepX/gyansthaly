import Link from "next/link"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4">

            <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">

                <div className="flex justify-center mb-4">
                    <FileQuestion className="w-14 h-14 text-indigo-500" />
                </div>

                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    404
                </h1>

                <h2 className="text-xl font-semibold text-gray-700 mb-3">
                    Page Not Found
                </h2>

                <p className="text-gray-500 mb-6">
                    The page you are looking for doesn't exist or has been moved.
                </p>

                <Link
                    href="/"
                    className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                    Back to Home
                </Link>

            </div>

        </div>
    )
}