"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, Globe, Leaf, ArrowRight, Target } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-6 shadow-2xl shadow-green-500/50 animate-pulse">
              <Zap className="w-12 h-12 text-black" />
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
                Green Lantern
                <span className="block text-green-400">Web Scanner</span>
              </h1>
              <p className="text-xl md:text-2xl text-green-300 max-w-3xl mx-auto leading-relaxed">
                {"In brightest day, in blackest night, no carbon waste shall escape my sight!"}
              </p>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Harness the power of the Green Lantern Corps to scan any website's carbon footprint and protect our
                digital environment.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <Link href="/scanner">
                <Button
                  className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-4 text-xl rounded-full shadow-2xl shadow-green-500/30 transition-all duration-300 transform hover:scale-105"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Shield className="w-6 h-6 mr-2" />
                  Activate Power Ring Scanner
                  <ArrowRight
                    className={`w-6 h-6 ml-2 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Corps Powers & Abilities</h2>
          <p className="text-xl text-gray-300">
            Advanced scanning technology powered by willpower and environmental consciousness
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="bg-gray-800/50 border-green-500/30 backdrop-blur-sm hover:border-green-500/60 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-400" />
              </div>
              <CardTitle className="text-xl text-green-400">Website Energy Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-center">
                Scan any website to reveal its energy consumption, server efficiency, and digital carbon footprint with
                Green Lantern precision.
              </p>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="bg-gray-800/50 border-green-500/30 backdrop-blur-sm hover:border-green-500/60 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-400" />
              </div>
              <CardTitle className="text-xl text-green-400">Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-center">
                Receive actionable insights and Green Lantern Corps-approved strategies to reduce website environmental
                impact.
              </p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="bg-gray-800/50 border-green-500/30 backdrop-blur-sm hover:border-green-500/60 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <CardTitle className="text-xl text-green-400">Environmental Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-center">
                Join the fight against digital pollution and help create a more sustainable web, one scan at a time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Power Ring Protocol</h2>
            <p className="text-xl text-gray-300">Simple steps to harness environmental scanning power</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto text-black font-bold text-2xl">
                1
              </div>
              <h3 className="text-xl font-bold text-green-400">Enter Website URL</h3>
              <p className="text-gray-300">Input any website URL into the Power Ring Scanner interface</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto text-black font-bold text-2xl">
                2
              </div>
              <h3 className="text-xl font-bold text-green-400">Activate Scan</h3>
              <p className="text-gray-300">Channel your willpower to initiate the environmental analysis</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto text-black font-bold text-2xl">
                3
              </div>
              <h3 className="text-xl font-bold text-green-400">Protect & Optimize</h3>
              <p className="text-gray-300">
                Receive detailed results and take action to reduce digital carbon footprint
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-green-400">2.8B</div>
            <div className="text-gray-300">Websites Scanned</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-green-400">45%</div>
            <div className="text-gray-300">Average CO₂ Reduction</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-green-400">1.2M</div>
            <div className="text-gray-300">Green Lanterns</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-green-400">99.9%</div>
            <div className="text-gray-300">Scan Accuracy</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join the Green Lantern Corps?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Start scanning websites and protecting our digital environment today. The power is in your hands.
          </p>
          <Link href="/scanner">
            <Button className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-4 text-xl rounded-full shadow-2xl shadow-green-500/30">
              <Zap className="w-6 h-6 mr-2" />
              Begin Environmental Mission
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-green-500" />
            <span className="text-green-400 font-bold text-lg">Green Lantern Web Scanner</span>
          </div>
          <p className="text-gray-400">Protecting Earth's digital environment, one website at a time.</p>
          <p className="text-gray-500 text-sm mt-4">
            © 2024 Green Lantern Corps Environmental Division. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
