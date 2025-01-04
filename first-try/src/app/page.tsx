import EmailEditor from "@/components/EmailEditor";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold text-center mb-8"></h1>
      <EmailEditor recipientEmail="1833719772@qq.com" />
    </main>
  );
}
