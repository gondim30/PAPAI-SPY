"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Camera, MessageCircle, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function EmergencyDownsellPage() {
  const [currentDateTime, setCurrentDateTime] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(12 * 60 * 60) // 12 hours in seconds

  // Set current date and time
  useEffect(() => {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, "0")
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const year = now.getFullYear()
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")

    setCurrentDateTime(`${day}/${month}/${year} ${hours}:${minutes}`)
  }, [])

  // Get phone and photo from URL params or sessionStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tel = urlParams.get("tel") || sessionStorage.getItem("phoneNumber") || "+55 (11) 99999-9999"
    const photo = urlParams.get("photo") || sessionStorage.getItem("profilePhoto")

    setPhoneNumber(tel)
    if (photo) {
      setProfilePhoto(photo)
    }
  }, [])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const downsellMessages = {
    lastChance: "LAST CHANCE!",
    loseAccess: "Don't lose access to the complete report",
    specialOffer: "LAST CHANCE SPECIAL OFFER",
    aboutToLose: "You were about to lose permanent access...",
    specialOfferNever: "Since you made it this far, we're making a special offer that will never be repeated.",
    discountToday: "42% discount - Today only",
    accessSuspicious: "I WANT TO ACCESS THE SUSPICIOUS CONTENT NOW",
    dontWantAccess: "I don't want to access the suspicious content now",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Emergency Alert Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white text-center py-4 px-4 shadow-lg">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{downsellMessages.lastChance}</h1>
          <p className="text-lg sm:text-xl">{downsellMessages.loseAccess}</p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Special Offer */}
        <Card className="border-orange-200 bg-white shadow-xl">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">{downsellMessages.specialOffer}</h2>
            <p className="text-lg font-semibold text-orange-600 mb-4">{downsellMessages.aboutToLose}</p>
            <p className="text-slate-700 mb-6">{downsellMessages.specialOfferNever}</p>

            {/* Pricing */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 shadow-lg mb-6 border border-orange-200">
              <div className="text-2xl font-bold text-slate-400 line-through mb-2">R$ 47</div>
              <div className="text-4xl font-bold text-orange-600 mb-4">R$ 27</div>
              <div className="text-sm text-slate-600 mb-4">{downsellMessages.discountToday}</div>

              {/* TriboPay OneClick Buttons */}
              <div className="text-center">
                <div style={{ width: "auto", maxWidth: "400px", margin: "0 auto" }}>
                  <button
                    data-fornpay="3olowe4hoo"
                    className="fornpay_btn bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 px-6 rounded-lg border border-emerald-700 cursor-pointer text-lg mb-4 w-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {downsellMessages.accessSuspicious}
                  </button>

                  <button
                    data-downsell="https://www.familysafe.online/emergency2"
                    className="fornpay_downsell mt-4 cursor-pointer text-base underline text-blue-600 hover:text-blue-800 transition-colors block w-full bg-transparent border-0"
                  >
                    {downsellMessages.dontWantAccess}
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What You're Missing */}
        <Card className="border-red-200 bg-white shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">What you're missing by refusing:</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Camera className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-800">Uncensored intimate photos</h4>
                  <p className="text-sm text-slate-600">All photos he/she sends to others</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-800">Complete conversations</h4>
                  <p className="text-sm text-slate-600">What's really being said in the messages</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-800">Exact location of meetings</h4>
                  <p className="text-sm text-slate-600">Where and when meetings are arranged</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Pressure */}
        <Card className="border-red-300 bg-gradient-to-r from-red-50 to-orange-50 shadow-xl">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-red-600 mb-2 flex items-center justify-center gap-2">
                <Clock className="w-8 h-8" />
                TIME IS RUNNING OUT!
              </h3>
              <p className="text-lg font-semibold text-slate-700">
                This offer expires in: <span className="text-red-600 font-mono">{formatTime(timeLeft)}</span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-slate-700 mb-4">
                After time expires, you will never have access to this information again.
              </p>
              <p className="text-red-600 font-semibold">
                The data will be permanently deleted for confidentiality reasons.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <Card className="border-emerald-200 bg-white shadow-xl">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-emerald-700 mb-4">Last chance to discover the truth</h3>
            <p className="text-slate-700 mb-6">
              Don't let doubt consume you. For just R$ 27, you'll have complete and permanent access to all information.
            </p>

            {/* Final CTA with TriboPay */}
            <div className="text-center">
              <div style={{ width: "auto", maxWidth: "400px", margin: "0 auto" }}>
                <button
                  data-fornpay="3olowe4hoo"
                  className="fornpay_btn bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 px-6 rounded-lg border border-emerald-700 cursor-pointer text-lg mb-4 w-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {downsellMessages.accessSuspicious}
                </button>

                <button
                  data-downsell="https://www.familysafe.online/emergency2"
                  className="fornpay_downsell mt-4 cursor-pointer text-base underline text-blue-600 hover:text-blue-800 transition-colors block w-full bg-transparent border-0"
                >
                  {downsellMessages.dontWantAccess}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <script src="https://app.tribopay.com.br/js/oneclick.js"></script>
    </div>
  )
}
