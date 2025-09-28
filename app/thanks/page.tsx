"use client"

import { motion } from "framer-motion"
import { CheckCircle, Clock, Mail, Shield, ArrowLeft, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function ThanksPage() {
  const router = useRouter()

  const reportItems = [
    "All profile photos (including private ones)",
    "Complete history of conversations and messages",
    "Exact location and dating activity data",
    "Detailed timeline of activities and patterns",
  ]

  const processSteps = [
    { icon: CheckCircle, label: "Payment Confirmed", status: "completed" },
    { icon: Clock, label: "Processing Report", status: "current" },
    { icon: Mail, label: "Email Delivery", status: "pending" },
  ]

  const thanksMessages = {
    paymentSuccessful: "Payment Completed Successfully!",
    thankYou: "Thank you for your purchase. Your complete report is being processed.",
    completeReportDelivery: "Complete Report Delivery",
    estimatedDelivery: "Estimated Delivery: Within 7 days",
    paymentConfirmed: "Payment Confirmed",
    reportProcessing: "Processing Report",
    emailDelivery: "Email Delivery",
    whatsIncluded: "What's Included",
    importantNotice: "Important Notice",
    checkEmail: "Please check your email regularly, including your spam/junk folder.",
    secureEmail: "The report will be sent from a secure email address.",
    contactSupport: "If you don't receive it within 7 days, contact our support team.",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-full mb-4 shadow-lg"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl font-bold text-slate-800 mb-2">{thanksMessages.paymentSuccessful}</h1>
            <p className="text-xl text-slate-600">{thanksMessages.thankYou}</p>
          </div>

          {/* Main Content Card */}
          <Card className="bg-white border-slate-200 shadow-xl">
            <CardContent className="p-8">
              {/* Report Delivery Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-blue-600" />
                  {thanksMessages.completeReportDelivery}
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  <strong>{thanksMessages.estimatedDelivery}</strong>
                </p>

                {/* Process Steps */}
                <div className="space-y-4">
                  {processSteps.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className={`flex items-center p-4 rounded-lg border-2 ${
                          step.status === "completed"
                            ? "bg-emerald-50 border-emerald-200"
                            : step.status === "current"
                              ? "bg-blue-50 border-blue-200"
                              : "bg-slate-50 border-slate-200"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 mr-3 ${
                            step.status === "completed"
                              ? "text-emerald-600"
                              : step.status === "current"
                                ? "text-blue-600"
                                : "text-slate-400"
                          }`}
                        />
                        <span
                          className={`font-semibold ${
                            step.status === "completed"
                              ? "text-emerald-700"
                              : step.status === "current"
                                ? "text-blue-700"
                                : "text-slate-500"
                          }`}
                        >
                          {step.label}
                        </span>
                        {step.status === "completed" && <CheckCircle className="w-5 h-5 text-emerald-600 ml-auto" />}
                        {step.status === "current" && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full ml-auto"
                          />
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-emerald-600" />
                  {thanksMessages.whatsIncluded}
                </h3>
                <div className="space-y-3">
                  {reportItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                      <span className="text-slate-600">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Important Notice */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8"
              >
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">{thanksMessages.importantNotice}</h4>
                    <p className="text-amber-700 leading-relaxed">
                      {thanksMessages.checkEmail}
                      <br />
                      <strong>{thanksMessages.contactSupport}</strong>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Security Badges */}
              <div className="flex justify-center items-center space-x-6 mb-8 text-sm text-slate-600">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1 text-emerald-600" />
                  Secure SSL
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-blue-600" />
                  Verified Payment
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1 text-purple-600" />
                  Protected Email
                </div>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                <Button
                  onClick={() => router.push("/")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </motion.div>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-8 text-slate-500 text-sm"
          >
            <p>
              Need help? Contact our support team at{" "}
              <a href="mailto:support@familysafe.online" className="text-blue-600 hover:underline">
                support@familysafe.online
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
