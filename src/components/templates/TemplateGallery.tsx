import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  Eye, 
  Code, 
  Star,
  Palette,
  Briefcase,
  ShoppingCart,
  User,
  FileText,
  Camera,
  Utensils,
  Gamepad2,
  Heart,
  Music
} from "lucide-react"
import { Template } from "@/types"

interface TemplateGalleryProps {
  onSelectTemplate: (template: Template) => void
}

export function TemplateGallery({ onSelectTemplate }: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const templates: Template[] = [
    {
      id: "portfolio-modern",
      name: "Modern Portfolio",
      description: "Clean, minimalist portfolio perfect for designers and developers",
      preview_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      category: "portfolio",
      tags: ["portfolio", "modern", "minimal", "responsive"],
      code_structure: {}
    },
    {
      id: "ecommerce-store",
      name: "E-commerce Store",
      description: "Full-featured online store with product catalog and checkout",
      preview_image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      category: "ecommerce",
      tags: ["ecommerce", "store", "products", "shopping"],
      code_structure: {}
    },
    {
      id: "saas-landing",
      name: "SaaS Landing Page",
      description: "Convert visitors with this high-converting SaaS landing page",
      preview_image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      category: "business",
      tags: ["saas", "landing", "business", "conversion"],
      code_structure: {}
    },
    {
      id: "blog-magazine",
      name: "Blog & Magazine",
      description: "Content-focused design perfect for blogs and online magazines",
      preview_image: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d3?w=400&h=300&fit=crop",
      category: "blog",
      tags: ["blog", "magazine", "content", "articles"],
      code_structure: {}
    },
    {
      id: "restaurant-menu",
      name: "Restaurant & Menu",
      description: "Appetizing design for restaurants with online menu and ordering",
      preview_image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      category: "restaurant",
      tags: ["restaurant", "menu", "food", "ordering"],
      code_structure: {}
    },
    {
      id: "photography-gallery",
      name: "Photography Gallery",
      description: "Stunning gallery layout to showcase your photography work",
      preview_image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop",
      category: "portfolio",
      tags: ["photography", "gallery", "portfolio", "visual"],
      code_structure: {}
    },
    {
      id: "agency-corporate",
      name: "Agency & Corporate",
      description: "Professional corporate website for agencies and businesses",
      preview_image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      category: "business",
      tags: ["agency", "corporate", "business", "professional"],
      code_structure: {}
    },
    {
      id: "fitness-gym",
      name: "Fitness & Gym",
      description: "Energetic design for fitness centers and personal trainers",
      preview_image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      category: "fitness",
      tags: ["fitness", "gym", "health", "training"],
      code_structure: {}
    },
    {
      id: "music-artist",
      name: "Music & Artist",
      description: "Creative layout for musicians and artists to showcase their work",
      preview_image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      category: "creative",
      tags: ["music", "artist", "creative", "showcase"],
      code_structure: {}
    },
    {
      id: "nonprofit-charity",
      name: "Nonprofit & Charity",
      description: "Inspiring design for nonprofits and charitable organizations",
      preview_image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
      category: "nonprofit",
      tags: ["nonprofit", "charity", "donation", "cause"],
      code_structure: {}
    }
  ]

  const categories = [
    { id: "all", name: "All Templates", icon: Palette },
    { id: "portfolio", name: "Portfolio", icon: User },
    { id: "business", name: "Business", icon: Briefcase },
    { id: "ecommerce", name: "E-commerce", icon: ShoppingCart },
    { id: "blog", name: "Blog", icon: FileText },
    { id: "restaurant", name: "Restaurant", icon: Utensils },
    { id: "creative", name: "Creative", icon: Music },
    { id: "fitness", name: "Fitness", icon: Heart },
    { id: "nonprofit", name: "Nonprofit", icon: Heart }
  ]

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Choose a Template</h1>
          <p className="text-gray-400">
            Start with a professional template and customize it with AI
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "border-gray-700 text-gray-300 hover:text-white hover:border-gray-600"
                  }
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="bg-gray-900 border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={template.preview_image}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <Button size="sm" variant="secondary">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Code className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm ml-1">4.8</span>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-3">{template.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button
                  onClick={() => onSelectTemplate(template)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Use This Template
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No templates found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}