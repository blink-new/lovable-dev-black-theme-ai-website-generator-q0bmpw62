export interface Project {
  id: string
  title: string
  description: string
  template: string
  preview_url?: string
  code_files?: Record<string, string>
  created_at: string
  user_id: string
  is_public: boolean
  tags: string[]
}

export interface Template {
  id: string
  name: string
  description: string
  preview_image: string
  category: string
  tags: string[]
  code_structure: Record<string, string>
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  project_id?: string
}

export interface GenerationRequest {
  prompt: string
  template_id?: string
  project_id?: string
}