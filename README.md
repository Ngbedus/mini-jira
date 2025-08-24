
# Mini Jira

Mini Jira is a lightweight issue tracking and project management tool inspired by Jira. It provides a simple Kanban board interface for managing tasks and tracking progress in software projects.

## Features

- 🗂️ Kanban board with columns for To Do, In Progress, and Done
- 📝 Create, view, and manage issues
- 📊 Board statistics for quick overview
- ⚡ Fast and modern UI built with React and Tailwind CSS
- 🖱️ Responsive design for desktop and mobile

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui (UI components)
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm

### Installation

Clone the repository:

```sh
git clone <YOUR_GIT_URL>
cd task-lite-flow
```

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## Project Structure

- `src/pages/Board.tsx`: Main Kanban board UI
- `src/components/TaskCard.tsx`: Individual issue/task card
- `src/components/CreateIssueDialog.tsx`: Dialog for creating new issues
- `src/data/mockData.ts`: Mock issue data

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch and open a pull request

## License

This project is licensed under the MIT License.
