interface AIResponse {
  content: string;
  success: boolean;
  error?: string;
}

interface GenerateWebsiteRequest {
  prompt: string;
  template?: string;
}

interface GenerateWebsiteResponse {
  html: string;
  css: string;
  js: string;
  files: Record<string, string>;
  success: boolean;
  error?: string;
}

class AIService {
  private groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
  private localLLMUrl = 'http://127.0.0.1:1234/v1/chat/completions';

  async generateText(prompt: string, useLocal = false): Promise<AIResponse> {
    try {
      if (useLocal) {
        return await this.callLocalLLM(prompt);
      } else {
        return await this.callGroqAPI(prompt);
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        content: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async generateWebsite(request: GenerateWebsiteRequest): Promise<GenerateWebsiteResponse> {
    try {
      const systemPrompt = `You are an expert web developer. Generate a complete, modern React website based on the user's description. 

Requirements:
- Use modern React with TypeScript
- Use Tailwind CSS for styling
- Create responsive, mobile-first design
- Use modern UI patterns and components
- Include proper file structure
- Generate clean, production-ready code

User Request: ${request.prompt}

Return a JSON response with the following structure:
{
  "html": "index.html content",
  "css": "main CSS content", 
  "js": "main JavaScript/React content",
  "files": {
    "src/App.tsx": "App component code",
    "src/components/Header.tsx": "Header component",
    "src/components/Hero.tsx": "Hero section",
    "package.json": "package.json content",
    "tailwind.config.js": "Tailwind config"
  }
}`;

      const response = await this.callGroqAPI(systemPrompt);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to generate website');
      }

      // Parse the AI response to extract website files
      try {
        const parsedResponse = JSON.parse(response.content);
        return {
          ...parsedResponse,
          success: true
        };
      } catch (parseError) {
        // Fallback: create a simple website structure
        return this.createFallbackWebsite(request.prompt);
      }
    } catch (error) {
      console.error('Website Generation Error:', error);
      return {
        html: '',
        css: '',
        js: '',
        files: {},
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate website'
      };
    }
  }

  private async callGroqAPI(prompt: string): Promise<AIResponse> {
    try {
      if (!this.groqApiKey) {
        throw new Error('Groq API key not configured. Please add VITE_GROQ_API_KEY to your environment variables.');
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-70b-versatile',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 4000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        content: data.choices[0]?.message?.content || '',
        success: true
      };
    } catch (error) {
      console.error('Groq API Error:', error);
      throw error;
    }
  }

  private async callLocalLLM(prompt: string): Promise<AIResponse> {
    try {
      const response = await fetch(this.localLLMUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'local-model',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 4000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`Local LLM error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        content: data.choices[0]?.message?.content || '',
        success: true
      };
    } catch (error) {
      console.error('Local LLM Error:', error);
      // Fallback to Groq if local LLM fails
      return await this.callGroqAPI(prompt);
    }
  }

  private createFallbackWebsite(prompt: string): GenerateWebsiteResponse {
    const siteName = this.extractSiteName(prompt);
    
    return {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>`,
      css: `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', sans-serif;
}`,
      js: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
      files: {
        'src/App.tsx': `import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">${siteName}</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to ${siteName}</h2>
          <p className="text-xl text-gray-300 mb-8">
            This website was generated based on your description: "${prompt}"
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium">
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;`,
        'package.json': `{
  "name": "${siteName.toLowerCase().replace(/\s+/g, '-')}",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.4.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24"
  }
}`
      },
      success: true
    };
  }

  private extractSiteName(prompt: string): string {
    // Simple extraction logic - can be improved
    const words = prompt.toLowerCase().split(' ');
    const commonWords = ['a', 'an', 'the', 'for', 'website', 'site', 'page'];
    const meaningfulWords = words.filter(word => !commonWords.includes(word));
    
    if (meaningfulWords.length > 0) {
      return meaningfulWords.slice(0, 2).map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    
    return 'My Website';
  }
}

export const aiService = new AIService();