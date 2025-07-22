import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Sparkles, ArrowRight, Zap, Code, Palette } from "lucide-react"
import { aiService } from "@/services/aiService"

interface HeroSectionProps {
  onStartProject: (prompt: string) => void
}

export function HeroSection({ onStartProject }: HeroSectionProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    try {
      // Test AI service connection
      console.log('Testing AI service with prompt:', prompt)
      const response = await aiService.generateText(`Analyze this website idea: ${prompt}`)
      console.log('AI Response:', response)
      
      await onStartProject(prompt)
    } catch (error) {
      console.error('Error generating website:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const examplePrompts = [
    "A modern portfolio website for a UX designer",
    "An e-commerce store for handmade jewelry",
    "A SaaS landing page for a productivity app",
    "A restaurant website with online ordering"
  ]

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Build websites with{" "}
            <span className="gradient-text">AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Describe your idea and watch as AI generates a complete, modern website 
            with live preview, full source code, and one-click deployment.
          </p>
        </div>

        {/* Chat input */}
        <Card className="glass-effect p-6 mb-8 max-w-2xl mx-auto">
          <div className="space-y-4">
            <Textarea
              placeholder="Describe the website you want to build... (e.g., 'A modern portfolio for a photographer with a dark theme and image gallery')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleSubmit()
                }
              }}
            />
            <Button 
              onClick={handleSubmit}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                  Generating your website...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Website
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Example prompts */}
        <div className="mb-12">
          <p className="text-gray-500 mb-4">Try these examples:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {examplePrompts.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setPrompt(example)}
                className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-600"
              >
                {example}
              </Button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="glass-effect p-6 text-center">
            <Zap className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-400">
              Generate complete websites in seconds with AI-powered code generation
            </p>
          </Card>
          
          <Card className="glass-effect p-6 text-center">
            <Code className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Full Source Code</h3>
            <p className="text-gray-400">
              Get complete React codebase with file tree, ready to customize and deploy
            </p>
          </Card>
          
          <Card className="glass-effect p-6 text-center">
            <Palette className="h-12 w-12 text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Modern Templates</h3>
            <p className="text-gray-400">
              Choose from 10+ professional templates or let AI create something unique
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}