"use client"

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import getStripe from "@/utils/get-stripe";
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export function Pricing() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()
    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }
  
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }
  
  const plans = [
    {
      title: "Basic",
      price: "Free",
      features: [
        "Access to all flashcards",
        "Basic study tools",
        "Limited AI suggestions",
      ],
      buttonLabel: "Get Started",
      asChild: true,
      href: "/sign-up"
    },
    {
      title: "Pro",
      price: "$0.99/month",
      features: [
        "All Basic features",
        "Advanced study tools",
        "Unlimited AI suggestions",
        "Priority support",
      ],
      buttonLabel: "Upgrade Now",
      onClick: handleSubmit
    },
  ];

  return (
    <section className="py-16" id="pricing">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Choose Your Plan
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className="shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl rounded-lg w-full mx-auto max-w-sm md:mx-0"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900">
                  {plan.title}
                </CardTitle>
                <p className="text-xl text-gray-600 mt-2">
                  {plan.price}
                </p>
              </CardHeader>
              <CardContent className="mt-4">
                <ul className="text-gray-600 space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                {
                  plan.asChild ? <>
                  <SignedIn>
                    <Button className="text-white bg-blue-600 hover:bg-blue-700 w-full py-3" asChild>
                      <Link href="/generate">Get Started</Link>
                    </Button>
                  </SignedIn>
                  <SignedOut>
                    <Button className="text-white bg-blue-600 hover:bg-blue-700 w-full py-3">
                      <Link href="/sign-up">Get Started</Link>
                    </Button> 
                  </SignedOut>
                  </> : <Button className="text-white bg-blue-600 hover:bg-blue-700 w-full py-3" onClick={plan.onClick}>
                  {plan.buttonLabel}
                </Button>
                }
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
