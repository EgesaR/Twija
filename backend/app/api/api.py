# app/routers/tours.py
from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from typing import List
from app.config.dependencies import get_supabase_client
from app.models.models import TourSchema

router = APIRouter(prefix="/tours", tags=["Tours"])


@router.get("/", response_model=List[TourSchema])
async def get_tours(db: Client = Depends(get_supabase_client)):
    try:
        # Using the injected 'db' (Supabase Client)
        res = db.table("tours").select("*").order("created_at").execute()
        return res.data
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to fetch tours: {str(e)}")


@router.get("/{tour_id}", response_model=TourSchema)
async def get_tour_by_id(tour_id: str, db: Client = Depends(get_supabase_client)):
    try:
        res = db.table("tours").select(
            "*").eq("id", tour_id).single().execute()
        if not res.data:
            raise HTTPException(status_code=404, detail="Tour not found")
        return res.data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
