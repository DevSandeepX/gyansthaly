"use client";

import { actionToast } from "@/lib/action-toast";
import { useState } from "react";

interface UserLoginFormProps {
    exams: {
        id: string
        name: string
    }[]
}

export default function UserLoginForm({ exams }: UserLoginFormProps) {

    const [rollNumber, setRollNumber] = useState("");
    const [examId, setExamId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!examId) {
            alert("Please select course");
            return;
        }

        if (!rollNumber.trim()) {
            alert("Please enter roll number");
            return;
        }

        setLoading(true);

        try {

            const res = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    rollNumber,
                    examId
                })
            });

            const data = await res.json();

            if (data.success) {
                actionToast({
                    success: true,
                    message: "Login Successfully"
                })
                window.location.href = `/exams/${examId}?student=${data.student.id}`;
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-[350px] space-y-4"
            >

                <h2 className="text-xl font-semibold text-center">
                    Student Login
                </h2>

                {/* Course Select */}
                <div>
                    <label className="block text-sm mb-1">
                        Select Course
                    </label>

                    <select
                        value={examId}
                        onChange={(e) => setExamId(e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Select Course</option>

                        {exams.map((exam) => (
                            <option key={exam.id} value={exam.id}>
                                {exam.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Roll Number */}
                <div>
                    <label className="block text-sm mb-1">
                        Roll Number
                    </label>

                    <input
                        type="text"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        placeholder="Enter Roll Number"
                        className="w-full border p-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>

        </div>
    );
}