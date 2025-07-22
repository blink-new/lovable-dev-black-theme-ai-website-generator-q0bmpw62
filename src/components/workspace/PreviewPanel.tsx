import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  ExternalLink, 
  Download, 
  Share, 
  RefreshCw,
  Globe
} from "lucide-react"

interface PreviewPanelProps {
  previewUrl?: string
  isGenerating: boolean
  onDeploy: () => void
  onDownload: () => void
}

export function PreviewPanel({ previewUrl, isGenerating, onDeploy, onDownload }: PreviewPanelProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate refresh delay
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const getFrameStyles = () => {
    switch (viewMode) {
      case 'mobile':
        return 'w-[375px] h-[667px]'
      case 'tablet':
        return 'w-[768px] h-[1024px]'
      default:
        return 'w-full h-full'
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-950">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-white">Live Preview</h2>
            
            {/* Viewport controls */}
            <div className="flex items-center space-x-1 bg-gray-900 rounded-lg p-1">
              <Button
                variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('desktop')}
                className="h-8 w-8 p-0"
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('tablet')}
                className="h-8 w-8 p-0"
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('mobile')}
                className="h-8 w-8 p-0"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="border-gray-700"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            
            {previewUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(previewUrl, '_blank')}
                className="border-gray-700"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Preview content */}
      <div className="flex-1 p-4">
        {isGenerating ? (
          <Card className="h-full flex items-center justify-center bg-gray-900/50 border-gray-800">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Generating your website...</h3>
              <p className="text-gray-400">This may take a few moments</p>
            </div>
          </Card>
        ) : previewUrl ? (
          <div className="h-full flex items-center justify-center">
            <div className={`preview-frame ${getFrameStyles()} max-w-full max-h-full`}>
              <iframe
                src={previewUrl}
                className="w-full h-full border-0 rounded-lg"
                title="Website Preview"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        ) : (
          <Card className="h-full flex items-center justify-center bg-gray-900/50 border-gray-800">
            <div className="text-center">
              <Globe className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No preview available</h3>
              <p className="text-gray-400">Start a conversation to generate your website</p>
            </div>
          </Card>
        )}
      </div>

      {/* Actions */}
      {previewUrl && (
        <div className="p-4 border-t border-gray-800">
          <div className="flex space-x-2">
            <Button
              onClick={onDeploy}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Globe className="mr-2 h-4 w-4" />
              Deploy
            </Button>
            <Button
              onClick={onDownload}
              variant="outline"
              className="flex-1 border-gray-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button
              variant="outline"
              className="border-gray-700"
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}