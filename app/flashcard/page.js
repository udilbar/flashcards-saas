"use client"

import { useUser } from "@clerk/nextjs"
import { collection, doc, getDocs, query, where } from "firebase/firestore"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import db from "@/firebase"

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState({})

  const searchParams = useSearchParams()
  const search = searchParams.get('id')

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return
  
      const colRef = collection(doc(collection(db, 'users'), user.id), "flashcards")
      const docs = await getDocs(colRef)
      const flashcards = []
      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() })
      })
      const flashcardSet = flashcards.find((f) => f.id === search);
      if (!flashcardSet) {
        alert(`No flashcard set found with id "${search}".`);
      }
      setFlashcards(flashcardSet.flashcards)
    }
    getFlashcard()
  }, [search, user])

  if (!isLoaded || !isSignedIn) return <></>

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      {
        flashcards.length > 0 && (
          <div className="flex flex-wrap -mx-2 mt-4">
            {flashcards.map((flashcard, index) => (
              <div key={index} className="w-full h-full sm:w-1/2 md:w-1/3 p-2">
                <div className="group perspective-1000 h-64 text-center">
                  <div
                    className={`w-full h-full cursor-pointer shadow-lg hover:shadow-xl transition-shadow rounded-lg overflow-hidden transform-style-preserve-3d duration-500`}
                    onClick={() => handleCardClick(index)}
                  >
                    {/* Front Side */}
                    <div className={`w-full h-full flex items-center justify-center bg-white p-4 transform backface-hidden rotate-y-0 ${
                      flipped[index] ? 'hidden' : ''
                    }`}>
                      <h5 className="text-lg font-semibold text-gray-800">
                        {flashcard.front}
                      </h5>
                    </div>
                    {/* Back Side */}
                    <div className={`w-full h-full flex items-center justify-center bg-white p-4 transform rotate-y-180 backface-hidden ${
                      !flipped[index] ? 'hidden' : '' 
                    }`}>
                      <h5 className="text-lg font-semibold text-gray-800">
                        {flashcard.back}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}