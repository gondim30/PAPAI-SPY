"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Shield, CheckCircle, Camera, MessageCircle, Lock, AlertTriangle, Eye, Skull } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function EmergencyPage() {
  const [currentDateTime, setCurrentDateTime] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60) // 24 hours in seconds
  const [city, setCity] = useState("")
  const [geoLoading, setGeoLoading] = useState(true)

  // =====================================================================
  //  SOLUÇÃO DEFINITIVA: Carregando o script da Monetizze manualmente
  // =====================================================================
  useEffect(() => {
    // Este efeito roda UMA VEZ após a página ser totalmente renderizada.
    // Isso garante que o iframe já exista no DOM quando o script for carregado.

    // Evita adicionar o script múltiplas vezes se o componente re-renderizar
    if (document.getElementById("monetizze-upsell-script")) {
      return
    }

    const script = document.createElement("script")
    script.id = "monetizze-upsell-script"
    script.src = "https://app.monetizze.com.br/upsell_incorporado.php"
    script.async = true

    document.body.appendChild(script)

    // Função de limpeza: remove o script se o componente for "desmontado"
    return () => {
      const existingScript = document.getElementById("monetizze-upsell-script")
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, []) // O array vazio [] garante que rode apenas uma vez.

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
                setCity(data.city || data.locality || "your area")
              } catch (error) {
                console.error("Error getting city:", error)
                setCity("your area")
              }
              setGeoLoading(false)
            },
            (error) => {
              console.error("Error getting location:", error)
              setCity("your area")
              setGeoLoading(false)
            },
          )
        } else {
          setCity("your area")
          setGeoLoading(false)
        }
      } catch (error) {
        console.error("Geolocation error:", error)
        setCity("your area")
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

    setCurrentDateTime(`${month}/${day}/${year} ${hours}:${minutes}`)
  }, [])

  // Get phone and photo from URL params or in-memory storage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tel = urlParams.get("tel") || "WhatsApp Research"
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
    { count: 13, description: "postagens contêm a palavra", keyword: "delicioso" },
    { count: 41, description: "mensagens contêm a palavra", keyword: "Amor" },
    { count: 20, description: "fotos e 5 vídeos estão ocultos por uma senha no telefone", keyword: null },
    { count: 8, description: "mensagens contêm a palavra", keyword: "Segredo" },
    { count: 2, description: "conversas arquivadas foram marcadas como suspeitas", keyword: null },
    {
      count: 9,
      description: "imagens desaparecidas recebidas recentemente foram também identificadas e restauradas",
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
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* Emergency Alert Header */}
      <div className="bg-red-600 text-white text-center py-6 px-4 animate-pulse">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Skull className="w-8 h-8 animate-bounce" />
            <h1 className="text-3xl sm:text-4xl font-black mb-2 text-red-100">⚠️ ALERTA CRÍTICO DE EMERGÊNCIA!</h1>
            <Skull className="w-8 h-8 animate-bounce" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-red-100">SEU FILHO ESTÁ EM PERIGO EXTREMO!</p>
          <p className="text-lg font-semibold text-red-200 mt-2">ATIVIDADES SUSPEITAS DETECTADAS AGORA MESMO</p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Algorithm Detection */}
        <Card className="border-red-500 bg-black border-2">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
              <h2 className="text-2xl sm:text-3xl font-black text-red-400 mb-4">
                NOSSO ALGORITMO DETECTOU ATIVIDADES PERIGOSAS
              </h2>
              <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
            </div>
            <p className="text-lg font-bold text-red-300 bg-red-900/30 p-4 rounded-lg border border-red-500">
              Relatório exportado com 98% de precisão em:{" "}
              <span className="text-blue-400 font-black">{currentDateTime}</span>
            </p>
          </CardContent>
        </Card>

        {/* Profile Photo and Phone */}
        {(profilePhoto || phoneNumber) && (
          <Card className="bg-black border-red-500 border-2">
            <CardContent className="p-6 text-center">
              {profilePhoto && (
                <div className="relative inline-block">
                  <img
                    src={profilePhoto || "/placeholder.svg"}
                    alt="Profile"
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover mx-auto mb-4 border-4 border-red-500 animate-pulse"
                  />
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-2 animate-bounce">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>
              )}
              {phoneNumber && <p className="text-2xl font-black text-red-400">{phoneNumber}</p>}
              <p className="text-red-300 font-bold mt-2">PERFIL MONITORADO EM TEMPO REAL</p>
            </CardContent>
          </Card>
        )}

        {/* Suspicious Content Summary */}
        <Card className="border-red-500 bg-black border-2">
          <CardContent className="p-6">
            <div className="text-center mb-6 bg-red-900/50 p-4 rounded-lg border border-red-500">
              <h3 className="text-2xl font-black text-red-400 mb-2">
                🚨 ENCONTRAMOS <span className="text-red-300 font-black text-3xl animate-pulse">58</span> MENSAGENS
                SUSPEITAS 🚨
              </h3>
              <p className="text-red-300 font-bold">CONTEÚDO ALTAMENTE PERIGOSO DETECTADO</p>
            </div>
            <div className="space-y-4">
              {suspiciousStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 bg-red-900/20 p-3 rounded-lg border border-red-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5 animate-pulse" />
                  <span className="text-sm sm:text-base text-red-200">
                    {stat.keyword ? (
                      <>
                        <span className="text-red-400 font-black text-lg">{stat.count}</span> {stat.description}{" "}
                        <span className="text-red-400 font-black bg-red-900/50 px-2 py-1 rounded">
                          "{stat.keyword}"
                        </span>
                        .
                      </>
                    ) : (
                      <>
                        <span className="text-red-400 font-black text-lg">{stat.count}</span> {stat.description}.
                      </>
                    )}
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp Messages Detection */}
        <Card className="border-red-500 bg-black border-2">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-black text-red-400 mb-2">
                💀 MENSAGENS PERIGOSAS DETECTADAS NO WHATSAPP 💀
              </h3>
              <p className="text-red-300 font-bold bg-red-900/50 p-3 rounded-lg border border-red-500">
                (Acesse o app para ver as mensagens completas)
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 max-w-sm mx-auto border-2 border-red-500">
              <div className="space-y-3">
                {[
                  { name: "Contato Desconhecido", time: "15:08", preview: "Oi linda...", danger: "ALTO RISCO" },
                  { name: "Chat Secreto", time: "14:32", preview: "Mal posso esperar...", danger: "CRÍTICO" },
                  { name: "Oculto", time: "13:45", preview: "Delete esta mensagem...", danger: "EXTREMO" },
                ].map((chat, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-red-900/30 rounded border border-red-700">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-red-300">{chat.name}</span>
                        <span className="text-xs text-red-400 font-bold">{chat.time}</span>
                      </div>
                      <p className="text-sm text-red-200 truncate mb-1" style={{ filter: "blur(2px)" }}>
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
        <Card className="border-red-500 bg-black border-2">
          <CardContent className="p-6">
            <div className="text-center mb-6 bg-red-900/50 p-4 rounded-lg border border-red-500">
              <h3 className="text-2xl font-black text-red-400 mb-2">🔞 CONTEÚDO ADULTO DETECTADO 🔞</h3>
              <p className="text-red-300 font-bold">FOTOS E VÍDEOS PERIGOSOS ENCONTRADOS</p>
              <p className="text-red-200 mt-2">(Acesse o app para ver o conteúdo não censurado)</p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-md mx-auto">
              {blockedImages.map((image, index) => (
                <div key={index} className="relative aspect-square border-2 border-red-500 rounded-lg overflow-hidden">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Censored ${index + 1}`}
                    className="w-full h-full object-cover"
                    style={{ filter: "blur(12px) brightness(0.3)" }}
                  />
                  <div className="absolute inset-0 bg-red-900 bg-opacity-60 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-red-400 animate-pulse" />
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
        <Card className="border-red-500 bg-black border-2">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-red-400 mb-4 text-center">
              O telefone que você quer rastrear foi localizado recentemente aqui.
            </h3>

            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-red-900/50 px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5 text-red-500" />
                <span className="font-semibold text-red-300">
                  {city ? `Última vez visto em ${city}` : "Localizando..."}
                </span>
              </div>
            </div>

            <div className="bg-red-900/50 h-64 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 opacity-50"></div>
              <div className="relative z-10 text-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2 animate-pulse"></div>
                <p className="text-sm font-semibold text-red-300">Localização aproximada</p>
                <p className="text-xs text-red-200">{city || "Carregando localização..."}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-2 border-red-500 rounded-full opacity-30"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Promotion */}
        <Card className="border-red-500 bg-black border-2">
          <CardContent className="p-6 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Camera className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-red-400 mb-4">Você chegou ao final da sua consulta gratuita.</h3>
            </div>

            <div className="space-y-4 text-left max-w-2xl mx-auto text-red-200">
              <p>Sabemos que você está cansado de adivinhar e quer respostas reais.</p>
              <p>
                Nosso sistema de rastreamento por satélite é a tecnologia mais avançada para descobrir o que está
                acontecendo. Mas aqui está o truque: manter os satélites e servidores funcionando 24/7 é caro.
              </p>
              <p>
                Por isso, infelizmente, não podemos fornecer mais do que 5% das informações que descobrimos
                gratuitamente.
              </p>
              <p>A boa notícia? Você não precisa gastar uma fortuna contratando um investigador particular.</p>
              <p>
                Desenvolvemos um aplicativo que coloca essa mesma tecnologia nas suas mãos e permite que você rastreie
                tudo discretamente e eficientemente por conta própria.
              </p>
              <p className="font-semibold text-red-300">
                É hora de parar de adivinhar e descobrir a verdade. As respostas estão esperando por você. Clique agora
                e obtenha acesso instantâneo – antes que seja tarde demais!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Time-Sensitive Offer */}
        <Card className="border-red-500 bg-gradient-to-r from-red-900 to-black border-2">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-black text-red-400 mb-2 animate-pulse">
                🔥 52% DE DESCONTO APENAS HOJE! 🔥
              </h3>
              <p className="text-xl font-bold text-red-300">
                Oferta expira em:{" "}
                <span className="text-red-400 font-mono text-2xl bg-red-900/50 px-3 py-1 rounded border border-red-500 animate-pulse">
                  {formatTime(timeLeft)}
                </span>
              </p>
              <p className="text-red-200 font-bold mt-2">⚠️ PROTEJA SEU FILHO ANTES QUE SEJA TARDE DEMAIS ⚠️</p>
            </div>

            <div className="text-center mb-6">
              <div className="inline-block bg-red-900/50 rounded-2xl p-6 shadow-2xl border-2 border-red-500">
                <div className="text-4xl font-bold text-gray-500 line-through mb-2">$97</div>
                <div className="text-6xl font-black text-red-400 mb-4 animate-pulse">$47</div>

                <div className="space-y-3 text-left mb-6">
                  {["Garantia de 30 dias", "Acesso por 1 ano", "Monitore até 3 números"].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <span className="text-red-200 font-bold">{feature}</span>
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
        <Card className="border-red-500 bg-black border-2">
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-red-400 mb-4">Garantia de 30 dias</h3>
            <div className="text-red-200 space-y-3 max-w-2xl mx-auto">
              <p>
                Sob a lei dos Estados Unidos, devemos reembolsar você se você não estiver satisfeito com o aplicativo
                dentro de 14 dias. No entanto, porque estamos tão confiantes de que nosso aplicativo funciona
                perfeitamente, estendemos essa garantia para 30 dias.
              </p>
              <p>
                Isso significa que você tem o dobro do tempo para testar o aplicativo e ver os resultados por conta
                própria – completamente sem riscos. Se por qualquer motivo você não estiver satisfeito, reembolsaremos
                você – sem perguntas.
              </p>
              <p className="font-semibold">
                Se você tiver alguma dúvida sobre reembolsos, entre em contato com o Suporte ao Cliente.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
