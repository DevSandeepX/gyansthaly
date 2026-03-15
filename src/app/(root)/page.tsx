import { Button } from "@/components/ui/button";
import { getExams } from "@/modules/exams/db";
import UserLoginForm from "@/modules/students/ui/components/user-login-form";
import { Show, UserButton } from "@clerk/nextjs";
import { Shield } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const exams = await getExams()
  return (
    <>
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <Show when="signed-out">
          <Link href="/sign-in">
            <Button className="gap-2" variant="outline">
              <Shield size={16} />
              Admin Panel
            </Button>
          </Link>
        </Show>
        <Show when="signed-in">
          <Button>
            <Link href={"/admin"}>
              Admin Panel
            </Link>
          </Button>
          <UserButton />
        </Show>
      </header>

      <div className="flex min-h-screen items-center justify-center  font-sans">
        <UserLoginForm
          exams={exams}
        />
      </div>
    </>
  );
}
