'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { doc, getDoc, setDoc, collection, writeBatch } from 'firebase/firestore';
import db from '@/firebase';

export default function Generate() {
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const {isLoaded, isSignedIn, user} = useUser();
  const [flipped, setFlipped] = useState([]);
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.')
      return
    }
  
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: text,
      })
  
      if (!response.ok) {
        throw new Error('Failed to generate flashcards')
      }
  
      const data = await response.json()
      setFlashcards(data)
    } catch (error) {
      console.error('Error generating flashcards:', error)
      alert('An error occurred while generating flashcards. Please try again.')
    }
  }

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  }

  const saveFlashcards = async () => {
    if (!name.trim()) {
      alert('Please enter a name for your flashcard set.')
      return
    }
  
    try {
      const userDocRef = doc(collection(db, 'users'), user.id)
      const userDocSnap = await getDoc(userDocRef)
  
      const batch = writeBatch(db)
  
      if (userDocSnap.exists()) {
        const collections = userDocSnap.data().flashcards || []
        if (collections.find((f) => f.name === name)) {
          alert("Flashcard set with the same name already exists")
          return
        }

        collections.push({name})
        batch.set(userDocRef, { flashcards: collections }, { merge: true})
      } else {
        batch.set(userDocRef, { flashcards: [{ name }] })
      }
  
      const setDocRef = doc(collection(userDocRef, 'flashcards'), name)
      batch.set(setDocRef, { flashcards })
      
      await batch.commit()
  
      alert('Flashcards saved successfully!')
      setName('');
      router.push("/flashcards")
    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('An error occurred while saving flashcards. Please try again.')
    }
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Generate Flashcards
        </h1>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
          className="w-full h-32 mb-4"
        />
        <Button
          variant="default"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          Generate Flashcards
        </Button>
      </div>
      
      {
        flashcards.length > 0 && (
          <>
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-4">Save</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h2 className="text-xl font-semibold">Save Flashcard Set</h2>
              </DialogHeader>
                <p className="text-gray-700 mb-4">
                  Please enter a name for your flashcard set.
                </p>
                <Input
                  autoFocus
                  placeholder="Set Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                />
              <DialogFooter>
                <Button variant="default" onClick={saveFlashcards} className="ml-2">
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
        )
      }
    </div>
  )
}
