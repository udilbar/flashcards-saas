import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Pricing() {
  const plans = [
    {
      title: "Basic",
      price: "$9.99/month",
      features: [
        "Access to all flashcards",
        "Basic study tools",
        "Limited AI suggestions",
      ],
      buttonLabel: "Get Started",
    },
    {
      title: "Pro",
      price: "$19.99/month",
      features: [
        "All Basic features",
        "Advanced study tools",
        "Unlimited AI suggestions",
        "Priority support",
      ],
      buttonLabel: "Upgrade Now",
    },
  ];

  return (
    <section className="bg-gray-50 py-16" id="pricing">
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
                <Button className="text-white bg-blue-600 hover:bg-blue-700 w-full py-3">
                  {plan.buttonLabel}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
