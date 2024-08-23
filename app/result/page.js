"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ResultPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const session_id = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return
      try {
        const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
        const sessionData = await res.json()
        if (res.ok) {
          setSession(sessionData)
        } else {
          setError(sessionData.error)
        }
      } catch (err) {
        setError('An error occurred while retrieving the session.')
      } finally {
        setLoading(false)
      }
    }
    fetchCheckoutSession()
  }, [session_id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-4 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-solid"></div>
        <p className="mt-2 text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-sm mx-auto text-center mt-4">
        <p className="text-lg font-semibold text-red-500">
          {error}
        </p>
      </div>
    );
  }

  return  <div className="max-w-sm mx-auto text-center mt-4">
    {session.payment_status === 'paid' ? (
      <>
        <h1 className="text-2xl font-bold">Thank you for your purchase!</h1>
        <div className="mt-2">
          <h2 className="text-xl font-semibold">Session ID: {session_id}</h2>
          <p className="text-base mt-1">
            We have received your payment. You will receive an email with the
            order details shortly.
          </p>
        </div>
      </>
    ) : (
      <>
        <h1 className="text-2xl font-bold">Payment failed</h1>
        <div className="mt-2">
          <p className="text-base">
            Your payment was not successful. Please try again.
          </p>
        </div>
      </>
    )}
  </div>
}