import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  File, 
  Folder, 
  FolderOpen, 
  ChevronRight, 
  ChevronDown,
  Copy,
  Download,
  Code
} from "lucide-react"

interface FileNode {
  name: string
  type: 'file' | 'folder'
  content?: string
  children?: FileNode[]
  path: string
}

interface CodePanelProps {
  files: Record<string, string>
  onDownload: () => void
}

export function CodePanel({ files, onDownload }: CodePanelProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']))

  // Convert flat file structure to tree
  const buildFileTree = (files: Record<string, string>): FileNode[] => {
    const tree: FileNode[] = []
    const folders: Record<string, FileNode> = {}

    Object.keys(files).forEach(filePath => {
      const parts = filePath.split('/')
      let currentLevel = tree
      let currentPath = ''

      parts.forEach((part, index) => {
        currentPath = currentPath ? `${currentPath}/${part}` : part
        
        if (index === parts.length - 1) {
          // It's a file
          currentLevel.push({
            name: part,
            type: 'file',
            content: files[filePath],
            path: filePath
          })
        } else {
          // It's a folder
          let folder = folders[currentPath]
          if (!folder) {
            folder = {
              name: part,
              type: 'folder',
              children: [],
              path: currentPath
            }
            folders[currentPath] = folder
            currentLevel.push(folder)
          }
          currentLevel = folder.children!
        }
      })
    })

    return tree
  }

  const fileTree = buildFileTree(files)

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedFolders(newExpanded)
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => (
      <div key={node.path}>
        <div
          className={`flex items-center py-1 px-2 hover:bg-gray-800 cursor-pointer ${
            selectedFile === node.path ? 'bg-gray-800' : ''
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path)
            } else {
              setSelectedFile(node.path)
            }
          }}
        >
          {node.type === 'folder' ? (
            <>
              {expandedFolders.has(node.path) ? (
                <ChevronDown className="h-4 w-4 text-gray-400 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-400 mr-1" />
              )}
              {expandedFolders.has(node.path) ? (
                <FolderOpen className="h-4 w-4 text-blue-400 mr-2" />
              ) : (
                <Folder className="h-4 w-4 text-blue-400 mr-2" />
              )}
            </>
          ) : (
            <File className="h-4 w-4 text-gray-400 mr-2 ml-5" />
          )}
          <span className="text-sm text-gray-300">{node.name}</span>
        </div>
        
        {node.type === 'folder' && expandedFolders.has(node.path) && node.children && (
          renderFileTree(node.children, depth + 1)
        )}
      </div>
    ))
  }

  const selectedFileContent = selectedFile ? files[selectedFile] : null

  return (
    <div className="flex h-full bg-gray-950">
      {/* File tree */}
      <div className="w-80 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <Code className="mr-2 h-5 w-5 text-blue-500" />
              Files
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={onDownload}
              className="border-gray-700"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2">
            {Object.keys(files).length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Code className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">No files generated yet</p>
              </div>
            ) : (
              renderFileTree(fileTree)
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Code editor */}
      <div className="flex-1 flex flex-col">
        {selectedFile && selectedFileContent ? (
          <>
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center">
                <File className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-300">{selectedFile}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(selectedFileContent)}
                className="border-gray-700"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="flex-1">
              <pre className="p-4 text-sm text-gray-300 font-mono bg-gray-950 overflow-x-auto">
                <code>{selectedFileContent}</code>
              </pre>
            </ScrollArea>
          </>
        ) : (
          <Card className="m-4 flex-1 flex items-center justify-center bg-gray-900/50 border-gray-800">
            <div className="text-center">
              <File className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Select a file</h3>
              <p className="text-gray-400">Choose a file from the tree to view its contents</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}