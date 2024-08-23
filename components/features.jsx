import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function Features() {
  const features = [
    {
      title: "Intuitive Flashcard Creation",
      description: "Easily create and organize your flashcards with a user-friendly interface.",
    },
    {
      title: "Customizable Study Plans",
      description: "Tailor your study sessions with custom schedules and reminders.",
    },
    {
      title: "AI-Powered Recommendations",
      description: "Get personalized flashcard suggestions based on your study habits.",
    },
  ];

  return (
    <section className="py-16" id="features">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="shadow-lg transition-transform transform hover:scale-105 rounded-lg"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
