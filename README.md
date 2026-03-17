# Shopify Customer Dashboard

A full-stack application with FastAPI backend and React frontend that fetches and displays customer data from Shopify's GraphQL API.

## Project Structure

```
Shopify/
├── main.py                 # FastAPI backend
├── requirements.txt        # Python dependencies
├── frontend/              # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx    # Main dashboard with live data
│   │   │   ├── Insights.jsx
│   │   │   ├── CampaignGenerator.jsx
│   │   │   └── Connections.jsx
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## Features

### Backend (FastAPI)
- ✅ GraphQL API integration with Shopify
- ✅ CORS enabled for React frontend
- ✅ Fetches customer data including order counts
- ✅ Error handling and proper HTTP responses

### Frontend (React + Shadcn UI)
- ✅ Clean, minimalistic white design
- ✅ 4-panel navigation (Dashboard, Insights, Campaign Generator, Connections)
- ✅ Real-time data fetching from backend API
- ✅ **Returning Customers** metric calculated from live Shopify data
- ✅ Loading states and error handling
- ✅ Responsive design with Tailwind CSS

## Setup & Installation

### Backend Setup

1. **Create and activate virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Run the FastAPI server:**
```bash
python main.py
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Running Both Servers

**Terminal 1 - Backend:**
```bash
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## API Endpoints

### GET /
Root endpoint to check if the API is running.

### GET /customers
Fetches the first 50 customers from Shopify with their ID and number of orders.

**Response:**
```json
{
  "data": {
    "customers": {
      "nodes": [
        {
          "id": "gid://shopify/Customer/123",
          "numberOfOrders": 5
        }
      ]
    }
  }
}
```

## Dashboard Metrics

- **Returning Customers**: Calculated from live Shopify data (customers with >1 order)
- **Traffic**: Sample data (can be connected to analytics API)
- **Avg Order Value**: Sample data (can be calculated from Shopify orders)
- **Conversion Rate**: Sample data (can be connected to analytics)
- **Revenue**: Sample data (can be calculated from Shopify orders)

## Technology Stack

**Backend:**
- FastAPI
- httpx (async HTTP client)
- uvicorn (ASGI server)

**Frontend:**
- React 18
- Vite
- Shadcn UI
- Tailwind CSS
- Lucide React (icons)

## Shopify Configuration

The Shopify API configuration is set in `main.py`:
- **Store URL**: testmarcadors.myshopify.com
- **API Version**: 2026-01
- **Access Token**: Configured in the application

## Development

### Backend
- Interactive API docs: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

### Frontend
- Development server with hot reload
- Component-based architecture
- Tailwind CSS for styling
- Shadcn UI components
