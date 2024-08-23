import { Button } from "@/components/ui/button";
import { Features } from "@/components/features";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Fragment } from "react";
import { Pricing } from "@/components/pricing";
import Link from "next/link";

export default function Home() {
  return (
    <Fragment>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-16">
          <h1 className="text-2xl font-bold text-gray-800">Flashcards SaaS</h1>
          <nav className="flex items-center justify-between grow">
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
              <Link href="#features" className="text-gray-700 hover:text-gray-900">Features</Link>
              <Link href="#pricing" className="text-gray-700 hover:text-gray-900">Pricing</Link>
            </div>
            <Button className="text-white bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main class="bg-gray-50 grow">
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Create and Manage Your Flashcards with Ease
            </h2>
            <p className="text-gray-600 mb-8">
              Organize your learning and stay on top of your studies with our advanced flashcard system.
            </p>
            <Button className="text-white bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-md" asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </section>
        <Features />
        <Pricing />
      </main>
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">&copy; 2024 Flashcards SaaS. All rights reserved.</p>
        </div>
      </footer>
    </Fragment>
  );
}
