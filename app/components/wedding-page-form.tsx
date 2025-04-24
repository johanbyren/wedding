"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { DatePicker } from "~/components/date-picker"

export function WeddingPageForm() {
  const [weddingDetails, setWeddingDetails] = useState({
    title: "",
    date: new Date(),
    location: "",
    story: "",
    coverPhotoUrl: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setWeddingDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setWeddingDetails((prev) => ({ ...prev, date }))
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Wedding Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="John & Jane's Wedding"
          value={weddingDetails.title}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Wedding Date</Label>
        <DatePicker date={weddingDetails.date} setDate={handleDateChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Wedding Location</Label>
        <Input
          id="location"
          name="location"
          placeholder="Venue name and address"
          value={weddingDetails.location}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="story">Your Love Story</Label>
        <Textarea
          id="story"
          name="story"
          placeholder="Share your journey together..."
          className="min-h-[100px]"
          value={weddingDetails.story}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="coverPhotoUrl">Cover Photo URL</Label>
        <Input
          id="coverPhotoUrl"
          name="coverPhotoUrl"
          placeholder="https://example.com/your-photo.jpg"
          value={weddingDetails.coverPhotoUrl}
          onChange={handleChange}
        />
        <p className="text-xs text-gray-500">
          Upload your photo to a hosting service and paste the URL here, or use our upload feature (coming soon).
        </p>
      </div>
    </div>
  )
}
