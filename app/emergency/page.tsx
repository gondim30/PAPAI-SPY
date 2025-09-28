"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Shield, CheckCircle, Camera, MessageCircle, Lock, AlertTriangle, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function EmergencyPage() {
  const [currentDateTime, setCurrentDateTime] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60) // 24 hours in seconds
  const [city, setCity] = useState("")
  const [geoLoading, setGeoLoading] = useState(true)

  // DEFINITIVE SOLUTION: Loading Monetizze script manually
  useEffect(() => {
    // This effect runs ONCE after the page is fully rendered.
    // This ensures that the iframe already exists in the DOM when the script is loaded.

    // Avoid adding the script multiple times if the component re-renders
    if (document.getElementById("monetizze-upsell-script")) {
      return
    }

    const script = document.createElement("script")
    script.id = "monetizze-upsell-script"
    script.src = "https://app.monetizze.com.br/upsell_incorporado.php"
    script.async = true

    document.body.appendChild(script)

    // Cleanup function: remove script if component is "unmounted"
    return () => {
      const existingScript = document.getElementById("monetizze-upsell-script")
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, []) // The empty array [] ensures it runs only once.

  // Get geolocation
  useEffect(() => {
    const getLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords

              try {
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
                )
                const data = await response.json()
                setCity(data.city || data.locality || "sua área")
              } catch (error) {
                console.error("Error getting city:", error)
                setCity("sua área")
              }
              setGeoLoading(false)
            },
            (error) => {
              console.error("Error getting location:", error)
              setCity("sua área")
              setGeoLoading(false)
            },
          )
        } else {
          setCity("sua área")
          setGeoLoading(false)
        }
      } catch (error) {
        console.error("Geolocation error:", error)
        setCity("sua área")
        setGeoLoading(false)
      }
    }

    getLocation()
  }, [])

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

  // Get phone and photo from URL params or in-memory storage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tel = urlParams.get("tel") || "Pesquisa WhatsApp"
    const photo = urlParams.get("photo")

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

  const suspiciousStats = [
    { count: 58, description: "mensagens suspeitas", keyword: null },
    { count: 13, description: "posts contêm a palavra", keyword: "delicioso" },
    { count: 41, description: "mensagens contêm a palavra", keyword: "Amor" },
    { count: 20, description: "fotos e 5 vídeos estão ocultos por senha no telefone", keyword: null },
    { count: 8, description: "mensagens contêm a palavra", keyword: "Segredo" },
    { count: 2, description: "conversas arquivadas foram marcadas como suspeitas", keyword: null },
    {
      count: 9,
      description: "imagens que desaparecem recebidas recentemente também foram identificadas e restauradas",
      keyword: null,
    },
    { count: 7, description: `localizações suspeitas foram detectadas perto de ${city || "sua área"}`, keyword: null },
  ]

  const blockedImages = [
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1544005313947-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      {/* Emergency Alert Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-6 px-4 shadow-lg">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <AlertTriangle className="w-8 h-8 animate-bounce" />
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white">ALERTA CRÍTICO DE EMERGÊNCIA!</h1>
            <AlertTriangle className="w-8 h-8 animate-bounce" />
          </div>
          <p className="text-xl sm:text-2xl font-semibold text-red-100">SEU FILHO ESTÁ EM PERIGO EXTREMO!</p>
          <p className="text-lg font-medium text-red-200 mt-2">ATIVIDADES SUSPEITAS DETECTADAS AGORA MESMO</p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Algorithm Detection */}
        <Card className="border-red-300 bg-white shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600 animate-pulse" />
              <h2 className="text-2xl sm:text-3xl font-bold text-red-700 mb-4">
                NOSSO ALGORITMO DETECTOU ATIVIDADES PERIGOSAS
              </h2>
              <AlertTriangle className="w-8 h-8 text-red-600 animate-pulse" />
            </div>
            <p className="text-lg font-semibold text-slate-700 bg-red-50 p-4 rounded-lg border border-red-200">
              Relatório exportado com 98% de precisão em:{" "}
              <span className="text-blue-600 font-bold">{currentDateTime}</span>
            </p>
          </CardContent>
        </Card>

        {/* Profile Photo and Phone */}
        {(profilePhoto || phoneNumber) && (
          <Card className="bg-white border-red-300 shadow-xl">
            <CardContent className="p-6 text-center">
              {profilePhoto && (
                <div className="relative inline-block">
                  <img
                    src={profilePhoto || "/placeholder.svg"}
                    alt="Profile"
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover mx-auto mb-4 border-4 border-red-500 shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-2 animate-bounce shadow-lg">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>
              )}
              {phoneNumber && <p className="text-2xl font-bold text-red-700">{phoneNumber}</p>}
              <p className="text-red-600 font-semibold mt-2">PERFIL MONITORADO EM TEMPO REAL</p>
            </CardContent>
          </Card>
        )}

        {/* Suspicious Content Summary */}
        <Card className="border-red-300 bg-white shadow-xl">
          <CardContent className="p-6">
            <div className="text-center mb-6 bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-2xl font-bold text-red-700 mb-2">
                🚨 ENCONTRAMOS <span className="text-red-600 font-black text-3xl animate-pulse">58</span> MENSAGENS
                SUSPEITAS 🚨
              </h3>
              <p className="text-red-600 font-semibold">CONTEÚDO PERIGOSO DETECTADO</p>
            </div>
            <div className="space-y-4">
              {suspiciousStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 bg-red-50 p-3 rounded-lg border border-red-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5 animate-pulse" />
                  <span className="text-sm sm:text-base text-red-600">
                    {stat.keyword ? (
                      <>
                        <span className="text-red-600 font-black text-lg">{stat.count}</span> {stat.description}{" "}
                        <span className="text-red-600 font-black bg-red-100 px-2 py-1 rounded">"{stat.keyword}"</span>.
                      </>
                    ) : (
                      <>
                        <span className="text-red-600 font-black text-lg">{stat.count}</span> {stat.description}.
                      </>
                    )}
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp Messages Detection */}
        <Card className="border-red-300 bg-white shadow-xl">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-red-700 mb-2">💀 MENSAGENS PERIGOSAS DETECTADAS NO WHATSAPP 💀</h3>
              <p className="text-red-600 font-semibold bg-red-100 p-3 rounded-lg border border-red-200">
                (Acesse o aplicativo para ver mensagens completas)
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 max-w-sm mx-auto border-2 border-red-200">
              <div className="space-y-3">
                {[
                  { name: "Contato Desconhecido", time: "15:08", preview: "Oi bela...", danger: "RISCO ALTO" },
                  { name: "Chat Segredo", time: "14:32", preview: "Não posso esperar...", danger: "CRÍTICO" },
                  { name: "Oculto", time: "13:45", preview: "Exclua esta mensagem...", danger: "EXTREMO" },
                ].map((chat, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-red-50 rounded border border-red-200">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-red-600">{chat.name}</span>
                        <span className="text-xs text-red-600 font-bold">{chat.time}</span>
                      </div>
                      <p className="text-sm text-red-600 truncate mb-1" style={{ filter: "blur(2px)" }}>
                        {chat.preview}
                      </p>
                      <span className="text-xs bg-red-600 text-white px-2 py-1 rounded font-bold animate-pulse">
                        {chat.danger}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nudity Detection */}
        <Card className="border-red-300 bg-white shadow-xl">
          <CardContent className="p-6">
            <div className="text-center mb-6 bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-2xl font-bold text-red-700 mb-2">🔞 CONTEÚDO INAPPROPRIADO DETECTADO 🔞</h3>
              <p className="text-red-600 font-semibold">FOTOS E VÍDEOS PERIGOSOS ENCONTRADOS</p>
              <p className="text-red-600 mt-2">(Acesse o aplicativo para ver conteúdo não censurado)</p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-md mx-auto">
              {blockedImages.map((image, index) => (
                <div key={index} className="relative aspect-square border-2 border-red-200 rounded-lg overflow-hidden">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Censored ${index + 1}`}
                    className="w-full h-full object-cover"
                    style={{ filter: "blur(12px) brightness(0.3)" }}
                  />
                  <div className="absolute inset-0 bg-red-50 bg-opacity-60 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-red-600 animate-pulse" />
                  </div>
                  <div className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 py-1 rounded font-bold">
                    +18
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Location Tracking */}
        <Card className="border-red-300 bg-white shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-red-700 mb-4 text-center">
              O telefone que você deseja rastrear foi localizado recentemente aqui.
            </h3>

            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-600">
                  {city ? `Última vez visto em ${city}` : "Localizando..."}
                </span>
              </div>
            </div>

            <div className="bg-red-50 h-64 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 opacity-50"></div>
              <div className="relative z-10 text-center">
                <div className="w-4 h-4 bg-red-600 rounded-full mx-auto mb-2 animate-pulse"></div>
                <p className="text-sm font-semibold text-red-600">Localização aproximada</p>
                <p className="text-xs text-red-600">{city || "Carregando localização..."}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-2 border-red-200 rounded-full opacity-30"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Promotion */}
        <Card className="border-red-300 bg-white shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Camera className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-red-700 mb-4">Você chegou ao final de sua consulta gratuita.</h3>
            </div>

            <div className="space-y-4 text-left max-w-2xl mx-auto text-red-600">
              <p>Sabemos que você está cansado de adivinhar e quer respostas reais.</p>
              <p>
                Nosso sistema de rastreamento por satélite é a tecnologia mais avançada para descobrir o que está
                acontecendo. Mas aqui está o truque: manter satélites e servidores funcionando 24/7 é caro.
              </p>
              <p>Que pena? Não precisa gastar uma fortuna contratando um investigador particular.</p>
              <p>
                Desenvolvemos um aplicativo que coloca essa mesma tecnologia nas suas mãos e permite que você monitore
                tudo discretamente e eficientemente por conta própria.
              </p>
              <p className="font-semibold text-red-600">
                É hora de parar de adivinhar e descobrir a verdade. As respostas estão esperando por você. Clique agora
                e obtenha acesso instantâneo – antes que seja tarde demais!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Time-Sensitive Offer */}
        <Card className="border-red-300 bg-gradient-to-r from-red-50 to-orange-50 shadow-xl">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-red-700 mb-2 animate-pulse">DESCONTO DE 52% APENAS HOJE!</h3>
              <p className="text-xl font-semibold text-slate-700">
                Oferta expira em:{" "}
                <span className="text-red-600 font-mono text-2xl bg-red-100 px-3 py-1 rounded border border-red-300 animate-pulse">
                  {formatTime(timeLeft)}
                </span>
              </p>
              <p className="text-red-600 font-bold mt-2">PROTEJA SEU FILHO ANTES QUE SEJA TARDE DEMAIS</p>
            </div>

            <div className="text-center mb-6">
              <div className="inline-block bg-white rounded-2xl p-6 shadow-xl border-2 border-red-200">
                <div className="text-4xl font-bold text-slate-400 line-through mb-2">R$ 97</div>
                <div className="text-6xl font-bold text-red-600 mb-4 animate-pulse">R$ 47</div>

                <div className="space-y-3 text-left mb-6">
                  {["Garantia de 30 dias", "Acesso por 1 ano", "Monitore até 3 números"].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center" style={{ width: "auto", maxWidth: "400px", margin: "0 auto" }}>
                  <iframe
                    className="iframeUpsell"
                    data-chave="dc685414ea8ee783a390a3b341c78ba0"
                    style={{ border: "none", width: "100%", minHeight: "150px" }}
                    title="Monetizze Upsell Offer"
                  ></iframe>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guarantee */}
        <Card className="border-slate-200 bg-white shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 bg-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Garantia de 30 dias</h3>
            <div className="text-slate-600 space-y-3 max-w-2xl mx-auto">
              <p>
                Sob a lei brasileira, devemos reembolsá-lo se você não estiver satisfeito com o aplicativo em 14 dias.
                No entanto, porque estamos tão confiantes de que nosso aplicativo funciona perfeitamente, estendemos
                esta garantia para 30 dias.
              </p>
              <p>
                Isso significa que você tem o dobro do tempo para testar o aplicativo e ver os resultados por si mesmo –
                completamente sem risco. Se por qualquer motivo você não estiver satisfeito, nós o reembolsaremos – sem
                perguntas.
              </p>
              <p className="font-semibold">
                Se você tiver alguma dúvida sobre reembolsos, entre em contato com o Atendimento ao Cliente.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
