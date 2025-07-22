import { useNavigate } from "react-router-dom"
import { TemplateGallery } from "@/components/templates/TemplateGallery"
import { Template } from "@/types"

export function TemplatesPage() {
  const navigate = useNavigate()

  const handleSelectTemplate = (template: Template) => {
    // Navigate to workspace with selected template
    const projectId = `project-${Date.now()}`
    navigate(`/workspace/${projectId}`, { 
      state: { 
        selectedTemplate: template,
        initialPrompt: `Create a website using the ${template.name} template. ${template.description}`
      } 
    })
  }

  return <TemplateGallery onSelectTemplate={handleSelectTemplate} />
}