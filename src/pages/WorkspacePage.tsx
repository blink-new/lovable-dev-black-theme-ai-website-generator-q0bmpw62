import { useState, useEffect, useCallback } from "react"
import { useParams, useLocation } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatPanel } from "@/components/workspace/ChatPanel"
import { PreviewPanel } from "@/components/workspace/PreviewPanel"
import { CodePanel } from "@/components/workspace/CodePanel"
import { ChatMessage, Project } from "@/types"
import { blink } from "@/blink/client"

export function WorkspacePage() {
  const { projectId } = useParams()
  const location = useLocation()
  const initialPrompt = location.state?.initialPrompt

  const [project, setProject] = useState<Project | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>()
  const [codeFiles, setCodeFiles] = useState<Record<string, string>>({})

  const generateAIResponse = (prompt: string): string => {
    const responses = [
      `I've created a modern website based on your request: "${prompt}". The design features a clean, responsive layout with a dark theme and modern typography. I've included all the essential pages and components you'll need.`,
      
      `Great idea! I've built a professional website that captures your vision. The site includes a responsive design, optimized performance, and modern UI components. You can see the live preview on the right and explore the full source code.`,
      
      `Perfect! I've generated a complete website with modern React architecture. The design is fully responsive and includes all the features you requested. Feel free to ask me to modify any aspect of the design or functionality.`
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const generateSampleCode = (prompt: string): Record<string, string> => {
    return {
      'package.json': JSON.stringify({
        name: 'generated-website',
        version: '1.0.0',
        private: true,
        dependencies: {
          'react': '^18.2.0',
          'react-dom': '^18.2.0',
          'react-scripts': '5.0.1',
          'tailwindcss': '^3.3.0'
        },
        scripts: {
          start: 'react-scripts start',
          build: 'react-scripts build',
          test: 'react-scripts test',
          eject: 'react-scripts eject'
        }
      }, null, 2),
      
      'src/App.js': `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Your Generated Website</h1>
          <p className="text-gray-300 mt-2">Built with AI from: "${prompt}"</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your New Website
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            This website was generated based on your requirements and is ready to be customized further.
          </p>
        </section>
        
        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Feature 1</h3>
            <p className="text-gray-600">Description of the first key feature of your website.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Feature 2</h3>
            <p className="text-gray-600">Description of the second key feature of your website.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Feature 3</h3>
            <p className="text-gray-600">Description of the third key feature of your website.</p>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Your Generated Website. Built with Lovable.dev</p>
        </div>
      </footer>
    </div>
  );
}

export default App;`,

      'src/App.css': `.App {
  text-align: center;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f8fafc;
}

.container {
  max-width: 1200px;
}`,

      'src/index.js': `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,

      'public/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Generated website created with Lovable.dev" />
    <title>Generated Website</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`,

      'README.md': `# Generated Website

This website was generated using Lovable.dev AI platform.

## Getting Started

\`\`\`bash
npm install
npm start
\`\`\`

## Deployment

\`\`\`bash
npm run build
\`\`\`

Built with ❤️ using Lovable.dev`
    }
  }

  const simulateAIGeneration = async (prompt: string) => {
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate AI response
    const aiResponse = generateAIResponse(prompt)
    const aiMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString(),
      project_id: projectId
    }

    setMessages(prev => [...prev, aiMessage])

    // Generate sample code files
    const sampleFiles = generateSampleCode(prompt)
    setCodeFiles(sampleFiles)

    // Set a mock preview URL
    setPreviewUrl(`https://example.com/preview/${projectId}`)
  }

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
      project_id: projectId
    }

    setMessages(prev => [...prev, userMessage])
    setIsGenerating(true)

    try {
      // Simulate AI response and code generation
      await simulateAIGeneration(content)
    } catch (error) {
      console.error('Error generating response:', error)
    } finally {
      setIsGenerating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId])

  useEffect(() => {
    if (initialPrompt) {
      // Start with the initial prompt
      handleSendMessage(initialPrompt)
    }
  }, [initialPrompt, handleSendMessage])

  const handleDeploy = async () => {
    // Simulate deployment
    alert('Deployment feature coming soon! Your website will be deployed to Vercel/Netlify.')
  }

  const handleDownload = async () => {
    // Simulate download
    alert('Download feature coming soon! You\'ll be able to download a ZIP file with all the code.')
  }

  return (
    <div className="h-screen flex bg-gray-950">
      {/* Chat Panel */}
      <div className="w-96 flex-shrink-0">
        <ChatPanel
          messages={messages}
          onSendMessage={handleSendMessage}
          isGenerating={isGenerating}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Tabs defaultValue="preview" className="h-full flex flex-col">
          <div className="border-b border-gray-800 px-4">
            <TabsList className="bg-gray-900">
              <TabsTrigger value="preview" className="data-[state=active]:bg-gray-800">
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="data-[state=active]:bg-gray-800">
                Code
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="preview" className="flex-1 m-0">
            <PreviewPanel
              previewUrl={previewUrl}
              isGenerating={isGenerating}
              onDeploy={handleDeploy}
              onDownload={handleDownload}
            />
          </TabsContent>

          <TabsContent value="code" className="flex-1 m-0">
            <CodePanel
              files={codeFiles}
              onDownload={handleDownload}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}