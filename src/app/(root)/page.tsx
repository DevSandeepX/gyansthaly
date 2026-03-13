import { getExams } from "@/modules/exams/db";
import UserLoginForm from "@/modules/students/ui/components/user-login-form";

export default async function Home() {
  const exams = await getExams()
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <UserLoginForm
        exams={exams}
      />
    </div>
  );
}
