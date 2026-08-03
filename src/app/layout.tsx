import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ThemeProvider } from "@/context/ThemeContext";
import { TaskProvider } from "@/context/TaskContext";
import { ReviewProvider } from "@/context/ReviewContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Mission Control OS | Personal Productivity Platform",
  description: "Personal Mission Control Operating System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} h-screen w-screen overflow-hidden bg-[var(--bg-main)] text-[var(--text-primary)] antialiased font-sans`}
      >
        <ThemeProvider>
          <TaskProvider>
            <ReviewProvider>
              <div className="relative flex h-screen w-screen overflow-hidden">
                {/* Fixed Slim Vertical Left Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex flex-1 flex-col md:pl-44 h-screen overflow-hidden min-w-0 transition-all duration-300">
                  <Topbar />
                  <main className="flex-1 overflow-hidden p-2 md:p-3 max-w-[1650px] w-full mx-auto flex flex-col justify-between">
                    {children}
                  </main>
                </div>
              </div>
            </ReviewProvider>
          </TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
