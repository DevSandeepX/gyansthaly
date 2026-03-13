
export default function ExamFinishPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-md">

                {/* Success Icon */}
                <div className="text-green-600 text-6xl mb-4">
                    ✓
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold mb-3">
                    Exam Submitted Successfully
                </h1>

                {/* Message */}
                <p className="text-gray-600 mb-6">
                    Thank you for completing the exam.
                    Your answers have been submitted successfully.
                </p>

                <p className="text-gray-500 text-sm mb-6">
                    You may now close this page or return to the dashboard.
                </p>



            </div>

        </div>
    )
}