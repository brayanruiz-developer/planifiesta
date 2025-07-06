from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.infrastructure.database import init_db
from app.entrypoints.events import router as events_router
from app.entrypoints.users import router as users_router
from app.entrypoints.budget_optimizer import router as budget_optimizer_router

app = FastAPI(title="Planifiesta API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

app.include_router(events_router)
app.include_router(users_router)
app.include_router(budget_optimizer_router)
