# Shopify Analytics Dashboard

A modern, simplistic React dashboard for Shopify analytics with a clean white design.

## Features

- **Dashboard**: View key metrics including Returning Customers, Traffic, Avg Order Value, Conversion Rate, and Revenue
- **Insights**: Analyze customer behavior and trends
- **Campaign Generator**: Create marketing campaigns
- **Connections**: Manage integrations and connections

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Shadcn UI** - UI components
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/           # Shadcn UI components
│   │   ├── Dashboard.jsx
│   │   ├── Insights.jsx
│   │   ├── CampaignGenerator.jsx
│   │   ├── Connections.jsx
│   │   └── Sidebar.jsx
│   ├── lib/
│   │   └── utils.js      # Utility functions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Design

The dashboard features a clean, minimalist white design with:
- Left sidebar navigation with 4 panels
- Metric cards with icons and trend indicators
- Responsive grid layout
- Smooth transitions and hover effects
- Consistent color scheme

## Connecting to Backend

To connect this frontend to the FastAPI backend, update the API calls in the Dashboard component to fetch real data from `http://localhost:8000/customers`.
