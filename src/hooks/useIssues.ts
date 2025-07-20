import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Issue } from '@/data/mockData'
import { useToast } from '@/hooks/use-toast'

export function useIssues() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchIssues()
  }, [])

  const fetchIssues = async () => {
    try {
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const formattedIssues: Issue[] = data.map(issue => ({
        id: issue.id,
        title: issue.title,
        description: issue.description,
        status: issue.status,
        priority: issue.priority,
        assignee: issue.assignee,
        reporter: issue.reporter,
        createdAt: issue.created_at.split('T')[0],
        updatedAt: issue.updated_at.split('T')[0],
        type: issue.type,
        estimate: issue.estimate
      }))

      setIssues(formattedIssues)
    } catch (error) {
      console.error('Error fetching issues:', error)
      toast({
        title: "Error",
        description: "Failed to fetch issues",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const createIssue = async (newIssue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const issueData = {
        title: newIssue.title,
        description: newIssue.description,
        status: newIssue.status,
        priority: newIssue.priority,
        assignee: newIssue.assignee,
        reporter: newIssue.reporter,
        type: newIssue.type,
        estimate: newIssue.estimate
      }

      const { data, error } = await supabase
        .from('issues')
        .insert([issueData])
        .select()
        .single()

      if (error) throw error

      const formattedIssue: Issue = {
        id: data.id,
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        assignee: data.assignee,
        reporter: data.reporter,
        createdAt: data.created_at.split('T')[0],
        updatedAt: data.updated_at.split('T')[0],
        type: data.type,
        estimate: data.estimate
      }

      setIssues(prev => [formattedIssue, ...prev])
      
      toast({
        title: "Success",
        description: "Issue created successfully"
      })

      return formattedIssue
    } catch (error) {
      console.error('Error creating issue:', error)
      toast({
        title: "Error",
        description: "Failed to create issue",
        variant: "destructive"
      })
      throw error
    }
  }

  const updateIssue = async (id: string, updates: Partial<Issue>) => {
    try {
      const { data, error } = await supabase
        .from('issues')
        .update({
          title: updates.title,
          description: updates.description,
          status: updates.status,
          priority: updates.priority,
          assignee: updates.assignee,
          reporter: updates.reporter,
          type: updates.type,
          estimate: updates.estimate,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      const formattedIssue: Issue = {
        id: data.id,
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        assignee: data.assignee,
        reporter: data.reporter,
        createdAt: data.created_at.split('T')[0],
        updatedAt: data.updated_at.split('T')[0],
        type: data.type,
        estimate: data.estimate
      }

      setIssues(prev => prev.map(issue => 
        issue.id === id ? formattedIssue : issue
      ))

      toast({
        title: "Success",
        description: "Issue updated successfully"
      })

      return formattedIssue
    } catch (error) {
      console.error('Error updating issue:', error)
      toast({
        title: "Error",
        description: "Failed to update issue",
        variant: "destructive"
      })
      throw error
    }
  }

  const deleteIssue = async (id: string) => {
    try {
      const { error } = await supabase
        .from('issues')
        .delete()
        .eq('id', id)

      if (error) throw error

      setIssues(prev => prev.filter(issue => issue.id !== id))
      
      toast({
        title: "Success",
        description: "Issue deleted successfully"
      })
    } catch (error) {
      console.error('Error deleting issue:', error)
      toast({
        title: "Error",
        description: "Failed to delete issue",
        variant: "destructive"
      })
      throw error
    }
  }

  const getIssuesByStatus = (status: Issue['status']) => 
    issues.filter(issue => issue.status === status)

  return {
    issues,
    loading,
    createIssue,
    updateIssue,
    deleteIssue,
    getIssuesByStatus,
    refetch: fetchIssues
  }
}