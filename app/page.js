import { Button } from "@/components/ui/button";
import { Features } from "@/components/features";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Fragment } from "react";
import { Pricing } from "@/components/pricing";
import Link from "next/link";

export default function Home() {
  return (
    <Fragment>
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Create and Manage Your Flashcards with Ease
          </h2>
          <p className="text-gray-600 mb-8">
            Organize your learning and stay on top of your studies with our advanced flashcard system.
          </p>
          <SignedIn>
            <Button className="text-white bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-md" asChild>
              <Link href="/generate">Get Started</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button className="text-white bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-md" asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button> 
          </SignedOut>
        </div>
      </section>
      <Features />
      <Pricing />
    </Fragment>
  );
}
