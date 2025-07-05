import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TaskCard } from "@/components/TaskCard"
import { mockIssues, getIssuesByStatus, Issue } from "@/data/mockData"
import { Plus } from "lucide-react"

export default function Board() {
  const [issues, setIssues] = useState(mockIssues)
  
  const todoIssues = getIssuesByStatus('todo')
  const inProgressIssues = getIssuesByStatus('inprogress')
  const doneIssues = getIssuesByStatus('done')

  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      issues: todoIssues,
      bgColor: 'bg-muted/20',
      headerColor: 'text-muted-foreground'
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      issues: inProgressIssues,
      bgColor: 'bg-primary/10',
      headerColor: 'text-primary'
    },
    {
      id: 'done',
      title: 'Done',
      issues: doneIssues,
      bgColor: 'bg-success/10',
      headerColor: 'text-success'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kanban Board</h1>
          <p className="text-muted-foreground">Visualize and manage your workflow</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Create Issue
        </Button>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {columns.map((column) => (
          <Card key={column.id} className={`${column.bgColor} flex flex-col h-full`}>
            <CardHeader className="pb-3">
              <CardTitle className={`flex items-center justify-between ${column.headerColor}`}>
                <span>{column.title}</span>
                <span className="text-sm bg-background text-foreground px-2 py-1 rounded-full">
                  {column.issues.length}
                </span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 space-y-3 overflow-y-auto">
              {column.issues.map((issue) => (
                <TaskCard key={issue.id} issue={issue} />
              ))}
              
              {column.issues.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <p className="text-sm">No issues in {column.title.toLowerCase()}</p>
                </div>
              )}
              
              {/* Add Issue Button */}
              <Button 
                variant="ghost" 
                className="w-full border-2 border-dashed border-muted-foreground/30 hover:border-muted-foreground/50 hover:bg-background/50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Issue
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Board Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-muted-foreground">{todoIssues.length}</div>
            <p className="text-sm text-muted-foreground">Backlog Items</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{inProgressIssues.length}</div>
            <p className="text-sm text-muted-foreground">Active Items</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-success">{doneIssues.length}</div>
            <p className="text-sm text-muted-foreground">Completed Items</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}