-- Create issues table
CREATE TABLE IF NOT EXISTS public.issues (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('todo', 'inprogress', 'done')),
    priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    assignee TEXT NOT NULL,
    reporter TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('story', 'bug', 'task')),
    estimate INTEGER
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_issues_updated_at 
    BEFORE UPDATE ON public.issues 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO public.issues (title, description, status, priority, assignee, reporter, type, estimate) VALUES
('Implement user authentication system', 'Create a secure authentication system with login, register, and password reset functionality.', 'inprogress', 'high', 'John Doe', 'Jane Smith', 'story', 8),
('Fix responsive layout on mobile devices', 'The navigation menu doesn''t display correctly on mobile screens smaller than 768px.', 'todo', 'medium', 'Alice Johnson', 'Bob Wilson', 'bug', 3),
('Set up project documentation', 'Create comprehensive documentation for the project including setup instructions and API documentation.', 'done', 'low', 'Charlie Brown', 'Jane Smith', 'task', 5),
('Optimize database queries', 'Improve performance by optimizing slow database queries in the user dashboard.', 'todo', 'high', 'David Lee', 'John Doe', 'task', 6),
('Add dark mode support', 'Implement dark mode theme toggle with proper color schemes and user preference persistence.', 'inprogress', 'medium', 'Eve Davis', 'Alice Johnson', 'story', 4),
('Critical security vulnerability in login', 'SQL injection vulnerability found in the login form that needs immediate attention.', 'todo', 'urgent', 'John Doe', 'Security Team', 'bug', 2);