# Todo App

A clean, minimalistic task-tracking web app built with React and Node.js. Features beautiful animations, responsive design, and persistent data storage.

## Features

- ✨ **Clean & Modern UI** - Minimalistic design with mod-color accents
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎭 **Micro-animations** - Delightful animations using Framer Motion
- 💾 **Data Persistence** - Tasks are saved between sessions
- 🔍 **Smart Filtering** - Filter tasks by All, Active, or Completed
- ✏️ **Inline Editing** - Edit tasks directly in the list
- 📊 **Progress Tracking** - Visual progress indicators and statistics
- ♿ **Accessible** - Full keyboard navigation and screen reader support
- 🌙 **Dark Mode Support** - Automatic dark mode based on system preference

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Framer Motion** - Smooth animations and transitions
- **Axios** - HTTP client for API calls
- **CSS Custom Properties** - Modern styling with CSS variables

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **File-based Storage** - JSON file persistence
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on `http://localhost:5000`
   - Frontend development server on `http://localhost:3000`

4. **Open your browser**
   Navigate to `http://localhost:3000` to use the app

### Alternative Setup

You can also start the servers individually:

**Backend only:**
```bash
cd server
npm install
npm run dev
```

**Frontend only:**
```bash
cd client
npm install
npm start
```

## Project Structure

```
todo-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── TodoForm.js
│   │   │   ├── TodoList.js
│   │   │   ├── TodoItem.js
│   │   │   ├── TodoFilters.js
│   │   │   └── TodoStats.js
│   │   ├── App.js         # Main app component
│   │   ├── App.css        # App-specific styles
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   └── package.json
├── server/                # Node.js backend
│   ├── data/             # JSON data storage
│   ├── index.js          # Express server
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## API Endpoints

The backend provides a RESTful API:

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `DELETE /api/todos` - Delete all completed todos

## Features in Detail

### Task Management
- Add new tasks with the input form
- Mark tasks as complete/incomplete with animated checkboxes
- Edit tasks inline by clicking the edit button
- Delete individual tasks
- Clear all completed tasks at once

### Filtering & Organization
- **All**: Show all tasks
- **Active**: Show only incomplete tasks
- **Completed**: Show only completed tasks

### Progress Tracking
- Visual progress bar showing completion percentage
- Statistics cards showing total, active, and completed tasks
- Real-time updates as you interact with tasks

### Animations & UX
- Smooth entry/exit animations for tasks
- Hover effects and micro-interactions
- Loading states for async operations
- Responsive design for all screen sizes

## Customization

### Styling
The app uses CSS custom properties for easy theming. Key variables are defined in `client/src/index.css`:

```css
:root {
  --primary: #6366f1;
  --accent: #10b981;
  --text-primary: #1e293b;
  /* ... more variables */
}
```

### Adding Features
The modular component structure makes it easy to add new features:
- Components are in `client/src/components/`
- Each component has its own CSS file
- API calls are centralized in the main App component

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for learning or as a starting point for your own applications.

## Acknowledgments

- Icons from emoji characters for simplicity
- Inter font from Google Fonts
- Framer Motion for animations
- React team for the amazing framework