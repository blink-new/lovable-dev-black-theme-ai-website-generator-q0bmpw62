import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { HeroSection } from "@/components/home/HeroSection"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Eye, 
  Star,
  ArrowRight
} from "lucide-react"

export function HomePage() {
  const navigate = useNavigate()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleStartProject = async (prompt: string) => {
    setIsGenerating(true)
    
    // Simulate project creation
    setTimeout(() => {
      const projectId = `project-${Date.now()}`
      navigate(`/workspace/${projectId}`, { 
        state: { initialPrompt: prompt } 
      })
    }, 2000)
  }

  const featuredProjects = [
    {
      id: "1",
      title: "Modern Portfolio",
      description: "Clean portfolio for a UX designer with dark theme",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      tags: ["Portfolio", "Dark Theme", "Modern"],
      likes: 234,
      views: 1200
    },
    {
      id: "2", 
      title: "E-commerce Store",
      description: "Minimalist online store for handmade jewelry",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      tags: ["E-commerce", "Minimal", "Products"],
      likes: 189,
      views: 890
    },
    {
      id: "3",
      title: "SaaS Landing",
      description: "High-converting landing page for productivity app",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      tags: ["SaaS", "Landing", "Conversion"],
      likes: 156,
      views: 756
    },
    {
      id: "4",
      title: "Restaurant Site",
      description: "Elegant restaurant website with online ordering",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      tags: ["Restaurant", "Ordering", "Elegant"],
      likes: 203,
      views: 1100
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <HeroSection onStartProject={handleStartProject} />

      {/* Featured Projects */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover what others have built with our AI-powered platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="glass-effect overflow-hidden hover:border-gray-600 transition-colors group">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" variant="secondary">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      {project.likes}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {project.views}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-600"
              onClick={() => navigate('/templates')}
            >
              View All Templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}