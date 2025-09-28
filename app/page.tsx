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
  { name: "WhatsApp", icon: MessageCircle, color: "text-green-600", description: "Mensagens e contatos" },
  { name: "Discord", icon: Users, color: "text-indigo-600", description: "Servidores e conversas" },
  { name: "TikTok", icon: Music, color: "text-pink-600", description: "Vídeos e interações" },
  { name: "Roblox", icon: Gamepad2, color: "text-blue-600", description: "Jogos e chat" },
  { name: "Instagram", icon: Instagram, color: "text-purple-600", description: "Posts e stories" },
  { name: "YouTube", icon: Youtube, color: "text-red-600", description: "Vídeos assistidos" },
]

const SalesProofPopup = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [currentMessage, setCurrentMessage] = useState("")

  const salesMessages = [
    "✅ Maria de São Paulo descobriu atividades suspeitas há 12 minutos",
    "✅ João visualizou recentemente as conversas do filho",
    "✅ Ana acabou de acessar relatório confidencial",
    "✅ Carlos completou análise completa agora mesmo",
    "✅ Fernanda obteve acesso ao relatório há poucos momentos",
    "✅ Roberto realizou verificação completa agora",
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
  const [generatingMessage, setGeneratingMessage] = useState("Analisando atividades nas redes sociais...")
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
      fullLabel: "Informações da Criança",
      mobileLabel: "Info",
      completed: ["verification", "preliminary", "generating", "result"].includes(currentStep),
    },
    {
      id: "verification",
      fullLabel: "Verificação WhatsApp",
      mobileLabel: "Verificar",
      completed: ["preliminary", "generating", "result"].includes(currentStep),
    },
    {
      id: "preliminary",
      fullLabel: "Escaneamento Preliminar",
      mobileLabel: "Escanear",
      completed: ["generating", "result"].includes(currentStep),
    },
    {
      id: "generating",
      fullLabel: "Gerando Relatório",
      mobileLabel: "Relatório",
      completed: ["result"].includes(currentStep),
    },
    {
      id: "result",
      fullLabel: "Resultados Prontos",
      mobileLabel: "Resultados",
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
        { progress: 0, message: "Verificando atividades nas redes sociais..." },
        { progress: 15, message: "Analisando dados de reconhecimento facial..." },
        { progress: 30, message: "Verificando padrões de login recentes..." },
        { progress: 45, message: "Escaneando WhatsApp, Discord e outras plataformas..." },
        { progress: 60, message: "Detectando atividades suspeitas de localização..." },
        { progress: 75, message: "Compilando evidências confidenciais..." },
        { progress: 90, message: "Quase pronto - finalizando seu relatório..." },
        { progress: 100, message: "Investigação concluída com sucesso!" },
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
        { progress: 0, message: "Analisando fotos do perfil..." },
        { progress: 20, message: "Processando histórico de mensagens..." },
        { progress: 40, message: "Verificando localizações acessadas..." },
        { progress: 60, message: "Compilando dados de atividade..." },
        { progress: 80, message: "Criptografando informações sensíveis..." },
        { progress: 95, message: "Finalizando relatório completo..." },
        { progress: 100, message: "Relatório gerado com sucesso!" },
      ]

      const messages = city
        ? [
            ...baseMessages.slice(0, 2),
            { progress: 30, message: `Analisando atividades recentes na região de ${city}...` },
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
        setPhotoError("Não foi possível carregar a foto")
        return
      }

      setProfilePhoto(data.result)
      setIsPhotoPrivate(!!data.is_photo_private)
    } catch (error) {
      console.error("Erro ao buscar foto:", error)
      setProfilePhoto(
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      )
      setIsPhotoPrivate(true)
      setPhotoError("Erro ao carregar foto")
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
    if (platform === "WhatsApp") return // WhatsApp sempre selecionado

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
        name: "Site X-V encontrado",
        icon: "🔞", // Adult content warning icon
        color: "text-red-600",
      },
      {
        name: "Chamada de vídeo em Discord",
        icon: "💬", // Discord chat icon
        color: "text-purple-600",
      },
      {
        name: "Omegle conversas suspeitas e grupos",
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
        lastSeen: `${Math.floor(Math.random() * 24)}h atrás`,
        description: "Atividade suspeita detectada",
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
                        Recursos
                      </a>
                      <a href="#security" className="text-gray-300 hover:text-white transition-colors">
                        Segurança
                      </a>
                    </div>
                    <Button className="btn-primary">Começar Agora</Button>
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
                        <span className="text-sm text-white/90 font-medium">Monitoramento em Tempo Real</span>
                      </div>

                      <h1 className="text-white mb-6">
                        Proteja Seus Filhos no
                        <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          Mundo Digital
                        </span>
                      </h1>

                      <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                        Monitore discretamente as atividades dos seus filhos em{" "}
                        <strong className="text-white">Roblox</strong>,<strong className="text-white"> WhatsApp</strong>
                        , <strong className="text-white">Discord</strong>,
                        <strong className="text-white"> TikTok</strong> e outras plataformas. Proteja-os de predadores e
                        conteúdo inadequado.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                      <Button onClick={() => setCurrentStep("form")} className="btn-primary text-lg px-8 py-4">
                        Começar Monitoramento
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
                        <span>100% Seguro</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-400" />
                        <span>Criptografado</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-purple-400" />
                        <span>Invisível</span>
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
                    <h2 className="text-white mb-4">Plataformas Monitoradas</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                      Cobertura completa das principais redes sociais e aplicativos utilizados por crianças e
                      adolescentes
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
                          Monitoramento Ativo
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
                    <h2 className="text-white mb-4">Recursos Avançados</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                      Tecnologia de ponta para proteção completa dos seus filhos no ambiente digital
                    </p>
                  </motion.div>

                  <div className="grid-professional grid-2-cols lg:grid-cols-3">
                    {[
                      {
                        icon: MessageSquare,
                        title: "Conversas do Roblox",
                        description: "Monitore todas as conversas e interações no Roblox em tempo real",
                        color: "text-green-400",
                      },
                      {
                        icon: ImageIcon,
                        title: "Imagens Trocadas",
                        description: "Veja todas as imagens enviadas e recebidas em chats privados",
                        color: "text-purple-400",
                      },
                      {
                        icon: Users,
                        title: "Grupos Suspeitos",
                        description: "Identifique grupos do WhatsApp com atividades inadequadas",
                        color: "text-red-400",
                      },
                      {
                        icon: Eye,
                        title: "Monitoramento Invisível",
                        description: "Seu filho não saberá que está sendo monitorado",
                        color: "text-blue-400",
                      },
                      {
                        icon: AlertTriangle,
                        title: "Alertas de Perigo",
                        description: "Receba notificações sobre comportamentos de risco imediatamente",
                        color: "text-orange-400",
                      },
                      {
                        icon: Shield,
                        title: "Proteção 24/7",
                        description: "Monitoramento contínuo em todas as plataformas digitais",
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
                      <h2 className="text-white mb-6">Pronto para Proteger Seus Filhos?</h2>
                      <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                        Junte-se a milhares de pais que já protegem seus filhos com o FamilySafe. Comece o monitoramento
                        em menos de 2 minutos.
                      </p>
                      <Button onClick={() => setCurrentStep("form")} className="btn-primary text-lg px-12 py-4 mb-6">
                        Começar Monitoramento Agora
                      </Button>
                      <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                        <span>✓ Sem instalação de apps</span>
                        <span>✓ 100% Confidencial</span>
                        <span>✓ Resultados em minutos</span>
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
                        Informações do Seu Filho
                      </h2>
                      <p className="text-gray-600 text-sm sm:text-base mb-4">
                        Preencha os detalhes para começar o monitoramento das atividades nas redes sociais
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
                          <span className="text-green-800 font-semibold text-sm">🔒 DADOS 100% SEGUROS</span>
                        </div>
                        <p className="text-green-700 text-xs sm:text-sm leading-relaxed">
                          <strong>Seus dados e segurança são totalmente protegidos.</strong> Todas as informações são
                          criptografadas com tecnologia militar e não saem do nosso sistema seguro. Garantimos total
                          privacidade e confidencialidade das informações do seu filho.
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 sm:mb-6">
                      <label className="block text-sm sm:text-base font-semibold text-blue-600 mb-2 sm:mb-3">
                        Enviar Foto para Verificação nas Plataformas
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
                              alt="Foto enviada"
                              className="w-24 h-24 object-cover rounded-lg border-2 border-blue-200"
                            />
                            <label
                              htmlFor="photo-upload"
                              className="cursor-pointer text-sm text-blue-600 hover:text-blue-700"
                            >
                              Trocar Foto
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
                            <span className="text-sm text-gray-600">Clique para enviar a foto do seu filho</span>
                            <span className="text-xs text-gray-400">
                              Usado para verificar identidade nas plataformas
                            </span>
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-blue-600 mb-2 sm:mb-3">
                          Nome da Criança/Adolescente
                        </label>
                        <Input
                          type="text"
                          placeholder="Digite o nome do seu filho"
                          value={childName}
                          onChange={(e) => setChildName(e.target.value)}
                          className="py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-blue-600 mb-2 sm:mb-3">
                          Idade
                        </label>
                        <Input
                          type="number"
                          placeholder="Idade do seu filho"
                          value={childAge}
                          onChange={(e) => setChildAge(e.target.value)}
                          className="py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          min="8"
                          max="18"
                        />
                      </div>

                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-blue-600 mb-2 sm:mb-3">
                          Número do WhatsApp do seu filho
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
                          Usado para identificar o perfil do seu filho e monitorar atividades suspeitas no WhatsApp.
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
                                  Perfil do WhatsApp Identificado
                                </p>
                                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                                  Perfil conectado - monitoramento ativo
                                </p>
                                {isPhotoPrivate && (
                                  <p className="text-xs text-yellow-400 mt-1 font-medium">
                                    ⚠️ Perfil com privacidade ativada - pode indicar comportamento secreto
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-blue-600 mb-2 sm:mb-3">
                          Plataformas para Monitorar
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {[
                            {
                              name: "WhatsApp",
                              icon: MessageCircle,
                              color: "text-green-600",
                              description: "Mensagens e contatos",
                            },
                            { name: "OnlyFans", icon: Users, color: "text-pink-600", description: "Conteúdo adulto" },
                            {
                              name: "Omegle",
                              icon: MessageSquare,
                              color: "text-blue-600",
                              description: "Chat anônimo",
                            },
                            {
                              name: "Chatroulette",
                              icon: Users,
                              color: "text-purple-600",
                              description: "Videochamadas aleatórias",
                            },
                            {
                              name: "Kik",
                              icon: MessageCircle,
                              color: "text-orange-600",
                              description: "Mensagens privadas",
                            },
                            {
                              name: "Telegram",
                              icon: MessageSquare,
                              color: "text-cyan-600",
                              description: "Chats secretos",
                            },
                            {
                              name: "Roblox",
                              icon: Gamepad2,
                              color: "text-red-600",
                              description: "Jogos e chat",
                            },
                            {
                              name: "Instagram",
                              icon: Instagram,
                              color: "text-purple-500",
                              description: "Posts e stories",
                            },
                            {
                              name: "Facebook",
                              icon: Users,
                              color: "text-blue-500",
                              description: "Rede social",
                            },
                            { name: "X-V████", icon: Users, color: "text-red-600", description: "Conteúdo adulto" },
                            {
                              name: "Snapchat",
                              icon: MessageCircle,
                              color: "text-yellow-500",
                              description: "Mensagens temporárias",
                            },
                            {
                              name: "Discord",
                              icon: MessageSquare,
                              color: "text-indigo-600",
                              description: "Servidores privados",
                            },
                            { name: "TikTok", icon: Users, color: "text-black", description: "Vídeos curtos" },
                            {
                              name: "Reddit",
                              icon: MessageSquare,
                              color: "text-orange-500",
                              description: "Fóruns anônimos",
                            },
                            {
                              name: "Twitch",
                              icon: Users,
                              color: "text-purple-500",
                              description: "Transmissões ao vivo",
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
                                <p className="text-xs text-blue-600 mt-1">Sempre incluído</p>
                              )}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2">
                          Selecione as plataformas que deseja monitorar. WhatsApp está sempre incluído.
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
                            Iniciando Monitoramento...
                          </div>
                        ) : (
                          "Iniciar Rastreamento Completo"
                        )}
                      </Button>

                      {!canVerify && (
                        <p className="text-center text-sm text-red-500 mt-3 font-medium">
                          Preencha todos os campos (nome, idade e número) para continuar
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
                      🔍 Escaneando Todas as Plataformas...
                    </h2>

                    <div className="mb-6 sm:mb-8">
                      <Progress value={verificationProgress} className="h-3 sm:h-4 mb-4 sm:mb-6" />
                      <p className="text-sm sm:text-base text-gray-600 font-medium">{verificationMessage}</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">
                          WhatsApp, Discord, TikTok escaneando...
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">
                          Processamento de reconhecimento facial...
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">
                          Análise de dados de localização...
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Conexão segura e criptografada - Nenhum rastro deixado
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
                        Encontramos Atividades Suspeitas...
                      </h2>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0" />
                        <h3 className="text-lg sm:text-xl font-bold text-red-700">ATIVIDADES SUSPEITAS DETECTADAS</h3>
                      </div>
                      <p className="text-sm sm:text-base text-red-600 font-medium leading-relaxed">
                        Nosso sistema descobriu múltiplas atividades suspeitas vinculadas a esta pessoa em{" "}
                        {selectedPlatforms.length} plataformas diferentes
                      </p>
                    </div>

                    <div className="mb-6 sm:mb-8">
                      <h4 className="text-base sm:text-lg font-bold text-blue-600 mb-4">🔍 Plataformas Escaneadas:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedPlatforms.map((platformName) => {
                          const platform =
                            monitoringPlatforms.find((p) => p.name === platformName) ||
                            [
                              { name: "OnlyFans", icon: Users, color: "text-pink-600", description: "Conteúdo adulto" },
                              {
                                name: "Omegle",
                                icon: MessageSquare,
                                color: "text-blue-600",
                                description: "Chat anônimo",
                              },
                              {
                                name: "Chatroulette",
                                icon: Users,
                                color: "text-purple-600",
                                description: "Videochamadas aleatórias",
                              },
                              {
                                name: "Kik",
                                icon: MessageCircle,
                                color: "text-orange-600",
                                description: "Mensagens privadas",
                              },
                              {
                                name: "Telegram",
                                icon: MessageSquare,
                                color: "text-cyan-600",
                                description: "Chats secretos",
                              },
                              { name: "Facebook", icon: Users, color: "text-blue-500", description: "Rede social" },
                              { name: "X-V████", icon: Users, color: "text-red-600", description: "Conteúdo adulto" },
                              {
                                name: "Snapchat",
                                icon: MessageCircle,
                                color: "text-yellow-500",
                                description: "Mensagens temporárias",
                              },
                              {
                                name: "Discord",
                                icon: MessageSquare,
                                color: "text-indigo-600",
                                description: "Servidores privados",
                              },
                              { name: "TikTok", icon: Users, color: "text-black", description: "Vídeos curtos" },
                              {
                                name: "Reddit",
                                icon: MessageSquare,
                                color: "text-orange-500",
                                description: "Fóruns anônimos",
                              },
                              {
                                name: "Twitch",
                                icon: Users,
                                color: "text-purple-500",
                                description: "Transmissões ao vivo",
                              },
                            ].find((p) => p.name === platformName)

                          if (!platform) return null

                          return (
                            <div key={platformName} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                              <platform.icon className={`w-5 h-5 ${platform.color}`} />
                              <div>
                                <p className="text-sm font-bold text-gray-900">{platform.name}</p>
                                <p className="text-xs text-green-600">✓ Escaneado</p>
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
                            Última Atividade: 3 horas atrás
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Detectamos atividade em Google aba anônima recentemente...
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-blue-600 text-sm sm:text-base mb-1 sm:mb-2">
                            {selectedPlatforms.length} Plataformas Atualmente Ativas
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {selectedPlatforms.slice(0, 3).join(", ")} e uma{" "}
                            <span className="animate-pulse text-red-500 font-bold">plataforma crítica +18</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-blue-600 text-sm sm:text-base mb-1 sm:mb-2">
                            Conversas Recentes Detectadas
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Mensagens ativas com múltiplos contatos e grupos esta semana
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
                          O que você verá no Relatório Completo:
                        </h3>
                      </div>
                      <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-blue-600">
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Capturas de tela de todos os perfis ativos
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Conversas e tela de todas as plataformas acionadas pelos pais
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Localizações exatas onde estiveram navegando
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Cronograma de todas as atividades para melhor proteção do seu filho
                        </li>
                      </ul>
                    </div>

                    <Button
                      onClick={() => setCurrentStep("generating")}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6 overflow-hidden flex items-center justify-center text-center"
                    >
                      <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                        🔓 DESBLOQUEAR EVIDÊNCIAS COMPLETAS – VER TUDO
                      </span>
                    </Button>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Anonimato completo garantido - Eles nunca saberão que você verificou
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
                      📊 Gerando Relatório Completo...
                    </h2>

                    <div className="mb-6 sm:mb-8">
                      <Progress value={generatingProgress} className="h-3 sm:h-4 mb-4 sm:mb-6" />
                      <p className="text-sm sm:text-base text-gray-600 font-medium">{generatingMessage}</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 rounded-xl">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">Fotos do perfil analisadas</span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-xl">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">Processando conversas...</span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded-full" />
                        <span className="text-xs sm:text-sm text-gray-500">Finalizando relatório...</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Criptografando dados sensíveis para sua privacidade
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
                          🚨 PERFIL ENCONTRADO EM 3 REDES SOCIAIS E DOIS GRUPOS DA CIDADE E UMA CONVERSA DE OUTRA REGIÃO
                        </h3>
                        <p className="text-xs sm:text-sm opacity-90">Última visualização: Online agora</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                      <div>
                        <h3 className="font-bold text-sm sm:text-base">⚠️ ATENÇÃO: PERFIL ATIVO ENCONTRADO!</h3>
                        <p className="text-xs sm:text-sm opacity-90">
                          Confirmamos que este número está vinculado a um perfil ATIVO nas redes sociais. Registros de
                          uso mais recentes detectados em {city || "sua região"}.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-red-500 mb-1">8</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">SITES (7 DIAS)</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-orange-500 mb-1">30</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">MENSAGENS (7 DIAS)</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-purple-500 mb-1">5</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">FOTOS TELEGRAM</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-green-500 mb-1">4</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">GRUPOS ATIVOS</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-blue-500 mb-1">12h</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">ÚLTIMA ATIVIDADE</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-indigo-500 mb-1">3</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">ATIVIDADES NOTURNAS</div>
                  </div>
                </div>

                <Card className="bg-white rounded-2xl shadow-lg border-0 mb-6 sm:mb-8">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6">
                      🔥 CONTATOS SUSPEITOS ENCONTRADOS
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
                            <p className="text-xs sm:text-sm text-gray-600">Última visualização: {profile.lastSeen}</p>
                            <p className="text-xs sm:text-sm text-red-600 font-medium">{profile.description}</p>
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
                      📸 CONVERSAS CENSURADAS
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                      Obtenha acesso instantâneo ao relatório completo com conversas não censuradas e histórico
                      completo. Mesmo que tentem apagar, temos tudo salvo.
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
                                alt={`Conversa ${index + 1}`}
                                className="w-full h-48 sm:h-64 object-cover"
                                style={{ filter: "blur(8px) brightness(0.7)" }}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <div className="text-center">
                                  <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white mx-auto mb-2 opacity-80" />
                                  <p className="text-white text-xs font-bold opacity-80">BLOQUEADO</p>
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
                        🔓 DESBLOQUEAR RELATÓRIO COMPLETO
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                        Obtenha acesso instantâneo ao relatório completo com conversas não censuradas e histórico
                        completo. Mesmo que tentem apagar, temos tudo salvo.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 sm:p-6 rounded-xl shadow-lg mb-4 sm:mb-6">
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
                        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                        <span className="font-bold text-lg sm:text-xl">O RELATÓRIO SERÁ DELETADO EM:</span>
                      </div>
                      <div className="text-center mb-3">
                        <div className="text-3xl sm:text-4xl font-bold mb-2">{formatTime(timeLeft)}</div>
                      </div>
                      <p className="text-sm sm:text-base text-center leading-relaxed opacity-90">
                        Após o tempo expirar, este relatório será removido permanentemente por motivos de privacidade.
                        Mesmo que afirmem ter deletado, ainda temos acesso aos dados.
                      </p>
                    </div>

                    <Button
                      onClick={() =>
                        window.open("https://pay.mundpay.com/0198c3e3-499d-7385-8865-25f594b421a7?ref=", "_blank")
                      }
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6 overflow-hidden"
                    >
                      <span className="block text-center leading-tight px-2">
                        🔓 DESBLOQUEAR MEU RELATÓRIO COMPLETO
                      </span>
                    </Button>

                    <div className="mt-4 sm:mt-6">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Shield className="w-4 h-4" />
                        100% Anônimo - Eles Nunca Saberão
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
