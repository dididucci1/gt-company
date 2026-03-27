'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Preencha e-mail e senha.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Informe um e-mail válido.')
      return
    }

    setIsLoading(true)

    // Simula delay de autenticação
    await new Promise((resolve) => setTimeout(resolve, 700))

    const validEmail = 'financeiro@gtcompany.com'
    const validPassword = 'gt2026*'

    if (email.toLowerCase() === validEmail && password === validPassword) {
      router.push('/dashboard')
    } else {
      setIsLoading(false)
      setError('Credenciais inválidas. Use financeiro@gtcompany.com e a senha gt2026*.')
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Brand Panel */}
      <div className="flex-1 relative overflow-hidden hidden md:flex flex-col items-center justify-center p-14">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/image.png"
            alt="Obra GT Company"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-purple-900/55"></div>
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Image
            src="/logo.png"
            alt="GT Company"
            width={400}
            height={160}
            className="h-40 w-auto max-w-sm object-contain brightness-0 invert drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* Form Panel */}
      <div className="w-full md:w-[480px] md:min-w-[480px] bg-white flex items-center justify-center p-12 md:p-14">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-[26px] font-bold text-indigo-950 mb-2">
              Bem-vindo ao Financeiro GT
            </h2>
            <p className="text-sm text-slate-600">
              Acesse o painel com seu usuário corporativo.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <div className="mb-[22px]">
              <label
                htmlFor="email"
                className="block text-[13px] font-semibold text-indigo-950 mb-2"
              >
                E-mail corporativo
              </label>
              <div className="relative">
                <div className="absolute left-[14px] top-1/2 -translate-y-1/2 text-slate-500">
                  <Mail className="w-[18px] h-[18px]" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="financeiro@gtcompany.com"
                  autoComplete="username"
                  className="w-full py-[13px] pl-11 pr-[14px] border-[1.5px] border-slate-300 rounded-[10px] text-sm text-indigo-950 bg-white outline-none transition-all focus:border-purple-500 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)] placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-[22px]">
              <label
                htmlFor="password"
                className="block text-[13px] font-semibold text-indigo-950 mb-2"
              >
                Senha
              </label>
              <div className="relative">
                <div className="absolute left-[14px] top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock className="w-[18px] h-[18px]" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full py-[13px] pl-11 pr-12 border-[1.5px] border-slate-300 rounded-[10px] text-sm text-indigo-950 bg-white outline-none transition-all focus:border-purple-500 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)] placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[14px] top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                  aria-label="Mostrar ou ocultar senha"
                >
                  {showPassword ? (
                    <EyeOff className="w-[18px] h-[18px]" />
                  ) : (
                    <Eye className="w-[18px] h-[18px]" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-[14px] bg-purple-600 hover:bg-purple-700 text-white text-[15px] font-semibold rounded-[10px] transition-all shadow-[0_4px_16px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.45)] disabled:opacity-70 disabled:cursor-wait"
            >
              Entrar
            </button>

            {/* Error Message */}
            {error && (
              <div className="mt-[14px] p-[10px_12px] rounded-[10px] bg-red-50 text-red-600 text-[13px]">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
