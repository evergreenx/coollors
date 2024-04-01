import React from 'react'

export default function Loading() {
  return (
    <div className="h-screen bg-white w-screen flex justify-center items-center">
      <div className="border-gray-300 h-14 w-14 animate-spin rounded-full border-2 border-t-black" />
    </div>
  )
}
