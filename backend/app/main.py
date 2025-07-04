from fastapi import FastAPI
from app.infrastructure.database import init_db
from app.entrypoints.events import router as events_router

app = FastAPI(title="Planifiesta API", version="1.0.0")

init_db()

app.include_router(events_router)
