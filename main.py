from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
import uvicorn
import os
from typing import Dict, Any
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Shopify Customer API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "https://shopify-analytics-6u93.onrender.com"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Shopify API Configuration
SHOPIFY_URL = os.getenv("SHOPIFY_URL", "https://testmarcadors.myshopify.com/admin/api/2026-01/graphql.json")
SHOPIFY_ACCESS_TOKEN = os.getenv("SHOPIFY_ACCESS_TOKEN")

GRAPHQL_QUERY = """
{
  customers(first: 50) {
    nodes {
      id
      numberOfOrders
    }
  }
}
"""


@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Shopify Customer API is running"}


@app.get("/customers")
async def get_customers() -> Dict[str, Any]:
    """
    Fetch customers from Shopify using GraphQL API
    
    Returns:
        Dict containing customer data with id and numberOfOrders
    """
    headers = {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN
    }
    
    payload = {
        "query": GRAPHQL_QUERY
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                SHOPIFY_URL,
                json=payload,
                headers=headers,
                timeout=30.0
            )
            
            # Raise exception for bad status codes
            response.raise_for_status()
            
            return response.json()
            
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"Shopify API error: {e.response.text}"
        )
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Request error: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error: {str(e)}"
        )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
