from fastapi import FastAPI
from app.infrastructure.database import init_db
from app.entrypoints.events import router as events_router
from app.entrypoints.users import router as users_router

app = FastAPI(title="Planifiesta API", version="1.0.0")

init_db()

app.include_router(events_router)
app.include_router(users_router)
