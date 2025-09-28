"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, MessageSquare, ImageIcon, Video, Shield, Clock, CheckCircle } from "lucide-react"

export default function Emergency2Page() {
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds

  const offerMessages = {
    exclusiveOffer: "OFERTA EXCLUSIVA - TEMPO LIMITADO",
    recoverDeleted: "Recuperar Mensagens Deletadas e Conteúdo Oculto",
    offerExpires: "Oferta expira em:",
    discoverHiding: "Descubra o que Estão Escondendo de Você",
    congratulations: "Parabéns por sua coragem em buscar a verdade sobre seu relacionamento.",
    advancedApp: "Nosso aplicativo avançado permite recuperar todas as mensagens, fotos e vídeos deletados",
    exclusiveAvailable: "Esta oferta exclusiva está disponível apenas nesta página.",
    normallyValued:
      "Normalmente avaliado em R$ 100, você pode obtê-lo agora por apenas R$ 47 (mais de 50% de desconto).",
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
          NÃO FECHE OU ATUALIZE ESTA PÁGINA, OU VOCÊ PODE ENCONTRAR UM ERRO COM SUA COMPRA.
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
                  <strong>{offerMessages.congratulations}</strong> É doloroso imaginar seu ente querido compartilhando
                  momentos com outra pessoa, mas você tem a inteligência e determinação para descobrir a verdade.
                </p>

                <p className="text-lg mb-6">
                  {offerMessages.advancedApp} sem deixar que nenhum segredo seja escondido de você.
                </p>

                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6 mb-6 border border-emerald-200">
                  <p className="text-lg mb-4">
                    <strong>{offerMessages.exclusiveAvailable}</strong> Normalmente avaliado em{" "}
                    <span className="line-through text-red-500">R$ 100</span>, você pode obtê-lo agora por apenas{" "}
                    <span className="text-emerald-600 font-bold text-2xl">R$ 47</span> (mais de 50% de desconto).
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md">
                <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Mensagens Deletadas</h3>
                <p className="text-slate-600">Recupere todas as conversas deletadas e chats do WhatsApp</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md">
                <ImageIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Fotos Ocultas</h3>
                <p className="text-slate-600">Acesse imagens deletadas e trocas de fotos privadas</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-md">
                <Video className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Vídeos Secretos</h3>
                <p className="text-slate-600">Descubra conteúdo de vídeo deletado e mensagens de voz</p>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 mb-8 border border-emerald-200">
              <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" />O que Você Recebe:
              </h3>
              <ul className="space-y-3 text-emerald-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Você receberá um guia detalhado para usar o aplicativo efetivamente
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Garantia de devolução do dinheiro em 30 dias incluída
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Acesso ao suporte ao cliente 24/7
                </li>
              </ul>
            </div>

            <div className="text-center mb-8">
              <p className="text-lg text-slate-700 mb-6">
                <strong>Aja agora para evitar decepção e garantir honestidade em seu relacionamento.</strong> Clique
                abaixo antes que esta oportunidade desapareça.
              </p>
            </div>

            <div className="text-center">
              <div style={{ width: "auto", maxWidth: "400px", margin: "0 auto" }}>
                <button
                  data-fornpay="d1hwl3oy3x"
                  className="fornpay_btn bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 px-6 rounded-lg border border-emerald-700 cursor-pointer text-lg mb-4 w-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  SIM, QUERO VER MENSAGENS DELETADAS E OCULTAS
                </button>

                <button
                  data-downsell="https://www.familysafe.online/thanks"
                  className="fornpay_downsell mt-4 cursor-pointer text-base underline text-blue-600 hover:text-blue-800 transition-colors block w-full bg-transparent border-none"
                >
                  Não, não quero acessar as mensagens, áudios ou fotos deletadas.
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
              <span>Pagamento Seguro</span>
              <span>•</span>
              <span>SSL Criptografado</span>
              <span>•</span>
              <span>Garantia de Devolução do Dinheiro</span>
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
