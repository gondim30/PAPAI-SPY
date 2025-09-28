"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, MessageSquare, ImageIcon, Video, Shield, Clock, CheckCircle } from "lucide-react"

export default function Emergency2Page() {
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds

  const offerMessages = {
    exclusiveOffer: "EXCLUSIVE OFFER - LIMITED TIME",
    recoverDeleted: "Recover Deleted Messages and Hidden Content",
    offerExpires: "Offer expires in:",
    discoverHiding: "Discover What They're Hiding From You",
    congratulations: "Congratulations on your courage to seek the truth about your relationship.",
    advancedApp: "Our advanced app allows you to recover all deleted messages, photos and videos",
    exclusiveAvailable: "This exclusive offer is only available on this page.",
    normallyValued: "Normally valued at R$ 100, you can get it now for just R$ 47 (more than 50% discount).",
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 text-center font-semibold text-sm md:text-base shadow-lg">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="w-5 h-5 animate-pulse" />
          DO NOT CLOSE OR REFRESH THIS PAGE, OR YOU MAY ENCOUNTER AN ERROR WITH YOUR PURCHASE.
        </div>
      </div>

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full mb-6 shadow-md">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">{offerMessages.exclusiveOffer}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              {offerMessages.recoverDeleted}
            </h1>

            <div className="bg-white rounded-lg p-6 shadow-xl border-2 border-red-200 mb-8">
              <div className="flex items-center justify-center gap-2 text-red-600 mb-4">
                <Clock className="w-6 h-6" />
                <span className="text-xl font-bold">
                  {offerMessages.offerExpires} {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8"
          >
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 text-center">
                {offerMessages.discoverHiding}
              </h2>

              <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
                <p className="text-xl mb-6">
                  <strong>{offerMessages.congratulations}</strong> It's painful to imagine your loved one sharing
                  moments with someone else, but you have the intelligence and determination to discover the truth.
                </p>

                <p className="text-lg mb-6">
                  {offerMessages.advancedApp} without letting any secret be hidden from you.
                </p>

                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6 mb-6 border border-emerald-200">
                  <p className="text-lg mb-4">
                    <strong>{offerMessages.exclusiveAvailable}</strong> Normally valued at{" "}
                    <span className="line-through text-red-500">R$ 100</span>, you can get it now for just{" "}
                    <span className="text-emerald-600 font-bold text-2xl">R$ 47</span> (more than 50% discount).
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md">
                <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Deleted Messages</h3>
                <p className="text-slate-600">Recover all deleted conversations and WhatsApp chats</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md">
                <ImageIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Hidden Photos</h3>
                <p className="text-slate-600">Access deleted images and private photo exchanges</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-md">
                <Video className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Secret Videos</h3>
                <p className="text-slate-600">Discover deleted video content and voice messages</p>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 mb-8 border border-emerald-200">
              <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                What You Get:
              </h3>
              <ul className="space-y-3 text-emerald-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  You'll receive a detailed guide to use the app effectively
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  30-day money-back guarantee included
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  24/7 customer support access
                </li>
              </ul>
            </div>

            <div className="text-center mb-8">
              <p className="text-lg text-slate-700 mb-6">
                <strong>Act now to avoid disappointment and ensure honesty in your relationship.</strong> Click below
                before this opportunity disappears.
              </p>
            </div>

            <div className="text-center">
              <div style={{ width: "auto", maxWidth: "400px", margin: "0 auto" }}>
                <button
                  data-fornpay="d1hwl3oy3x"
                  className="fornpay_btn bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 px-6 rounded-lg border border-emerald-700 cursor-pointer text-lg mb-4 w-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  YES, I WANT TO SEE DELETED AND HIDDEN MESSAGES
                </button>

                <button
                  data-downsell="https://www.familysafe.online/thanks"
                  className="fornpay_downsell mt-4 cursor-pointer text-base underline text-blue-600 hover:text-blue-800 transition-colors block w-full bg-transparent border-none"
                >
                  No, I don't want to access deleted messages, audios or photos.
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-center text-slate-600"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Shield className="w-6 h-6 text-emerald-600" />
              <span>Secure Payment</span>
              <span>•</span>
              <span>SSL Encrypted</span>
              <span>•</span>
              <span>Money Back Guarantee</span>
            </div>
          </motion.div>
        </div>
      </div>

      <script
        src="https://app.tribopay.com.br/js/oneclick.js"
        onLoad={() => console.log("TriboPay script loaded successfully")}
        onError={() => console.error("Failed to load TriboPay script")}
      ></script>
    </div>
  )
}
