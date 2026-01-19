from fastapi import FastAPI
import os

app = FastAPI()

@app.get("/")
async def root():
    return {
        "message": "Hello from backend!", 
        "instance": os.getenv("HOSTNAME")
    } 

@app.get("/health")
async def health():
    return {"status": "ok"}