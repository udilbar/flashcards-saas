"use client"

import { Card, CardContent } from "@/components/ui/card"
import db from "@/firebase"
import { useUser } from "@clerk/nextjs"
import { doc, collection, getDoc, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function getFlashcards() {
      console.log("user", user)
      if (!user) return
      const docRef = doc(collection(db, 'users'), user.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || []
        console.log("collections", collections)
        setFlashcards(collections)
      } else {
        await setDoc(docRef, { flashcards: [] })
      }
    }
    getFlashcards()
  }, [user])

  if (!isLoaded || !isSignedIn) return <></>

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`)
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Flashcard sets
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {flashcards.map((flashcard, index) => (
          <div key={index} className="flex">
            <Card
              onClick={() => handleCardClick(flashcard.name)} 
              className="w-full cursor-pointer">
              <CardContent>
                <h5 className="text-lg font-semibold mt-6">
                  {flashcard.name}
                </h5>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}