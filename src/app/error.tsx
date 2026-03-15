"use client"

import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export default function ErrorPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">

            <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">

                <div className="flex justify-center mb-4">
                    <AlertTriangle className="text-red-500 w-14 h-14" />
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Access Denied
                </h1>

                <p className="text-gray-500 mb-6">
                    You don't have permission to access this page.
                </p>

                <div className="flex justify-center gap-3">

                    <Link
                        href="/"
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Go Home
                    </Link>
                </div>

            </div>

        </div>
    )
}