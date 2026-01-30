from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
import uuid
from supabase import Client
from typing import List
from app.core.supabase import get_supabase_client
from app.models.tour import TourSchema

router = APIRouter(prefix="/tours")


@router.get("/", response_model=List[TourSchema])
def get_tours(db: Client = Depends(get_supabase_client)):
    try:
        res = db.table("tours").select(
            "*").order("created_at", desc=True).execute()
        return res.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{tour_id}", response_model=TourSchema)
def get_tour(tour_id: str, db: Client = Depends(get_supabase_client)):
    res = db.table("tours").select("*").eq("id", tour_id).single().execute()
    if not res.data:
        raise HTTPException(status_code=404)
    return res.data


@router.post("/upload-image")
async def upload_tour_image(
    file: UploadFile = File(...),
    db: Client = Depends(get_supabase_client)
):
    try:
        filename = file.filename or "uploaded_file"
        file_ext = filename.split(".")[-1] if "." in filename else "jpg"
        file_path = f"tours/{uuid.uuid4()}.{file_ext}"
        file_content = await file.read()

        # Upload to Supabase Storage bucket 'tour-images'
        db.storage.from_("tour-images").upload(
            path=file_path,
            file=file_content,
            file_options={"content-type": f"image/{file_ext}"}
        )

        # Get the public URL
        url_res = db.storage.from_("tour-images").get_public_url(file_path)
        return {"image_url": url_res}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


@router.post("/", response_model=TourSchema)
def create_tour(tour_data: dict, db: Client = Depends(get_supabase_client)):
    # Your CRUD logic here...
    res = db.table("tours").insert(tour_data).execute()
    return res.data[0]


@router.delete("/{tour_id}")
def delete_tour(tour_id: str, db: Client = Depends(get_supabase_client)):
    try:
        # FastAPI handles the authenticated delete
        res = db.table("tours").delete().eq("id", tour_id).execute()
        if not res.data:
            raise HTTPException(status_code=404, detail="Tour not found")
        return {"status": "success", "message": f"Tour {tour_id} deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
