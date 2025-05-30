import Image from "next/image";

export default function Home() {
  return (
    <div className="">
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to My Next.js App</h1>
      <Image
        src="/nextjs-logo.png"
        alt="Next.js Logo"
        width={200}
        height={200}
      />
      <p className="mt-4 text-lg">
        This is a simple example of a Next.js application.
      </p>
    </main>
            <footer className="w-full h-full flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} My Next.js App. All rights reserved.
        </p>
      </footer>
    </div>

  );
}
