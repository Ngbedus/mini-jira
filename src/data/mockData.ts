export interface Issue {
  id: string
  title: string
  description: string
  status: "todo" | "inprogress" | "done"
  priority: "low" | "medium" | "high" | "urgent"
  assignee: string
  reporter: string
  createdAt: string
  updatedAt: string
  type: "story" | "bug" | "task"
  estimate?: number
}

export const mockIssues: Issue[] = [
  {
    id: "PROJ-1",
    title: "Implement user authentication system",
    description: "Create a secure authentication system with login, register, and password reset functionality.",
    status: "inprogress",
    priority: "high",
    assignee: "John Doe",
    reporter: "Jane Smith",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    type: "story",
    estimate: 8
  },
  {
    id: "PROJ-2",
    title: "Fix responsive layout on mobile devices",
    description: "The navigation menu doesn't display correctly on mobile screens smaller than 768px.",
    status: "todo",
    priority: "medium",
    assignee: "Alice Johnson",
    reporter: "Bob Wilson",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18",
    type: "bug",
    estimate: 3
  },
  {
    id: "PROJ-3",
    title: "Set up project documentation",
    description: "Create comprehensive documentation for the project including setup instructions and API documentation.",
    status: "done",
    priority: "low",
    assignee: "Charlie Brown",
    reporter: "Jane Smith",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-16",
    type: "task",
    estimate: 5
  },
  {
    id: "PROJ-4",
    title: "Optimize database queries",
    description: "Improve performance by optimizing slow database queries in the user dashboard.",
    status: "todo",
    priority: "high",
    assignee: "David Lee",
    reporter: "John Doe",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-19",
    type: "task",
    estimate: 6
  },
  {
    id: "PROJ-5",
    title: "Add dark mode support",
    description: "Implement dark mode theme toggle with proper color schemes and user preference persistence.",
    status: "inprogress",
    priority: "medium",
    assignee: "Eve Davis",
    reporter: "Alice Johnson",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-21",
    type: "story",
    estimate: 4
  },
  {
    id: "PROJ-6",
    title: "Critical security vulnerability in login",
    description: "SQL injection vulnerability found in the login form that needs immediate attention.",
    status: "todo",
    priority: "urgent",
    assignee: "John Doe",
    reporter: "Security Team",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-21",
    type: "bug",
    estimate: 2
  }
]

export const getIssuesByStatus = (status: Issue['status']) => 
  mockIssues.filter(issue => issue.status === status)

export const getPriorityColor = (priority: Issue['priority']) => {
  switch (priority) {
    case 'urgent': return 'bg-destructive text-destructive-foreground'
    case 'high': return 'bg-warning text-warning-foreground'
    case 'medium': return 'bg-primary text-primary-foreground'
    case 'low': return 'bg-muted text-muted-foreground'
    default: return 'bg-muted text-muted-foreground'
  }
}

export const getTypeIcon = (type: Issue['type']) => {
  switch (type) {
    case 'story': return '📖'
    case 'bug': return '🐛'
    case 'task': return '✅'
    default: return '📝'
  }
}