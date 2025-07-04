from fastapi import FastAPI
from app.infrastructure.database import init_db

app = FastAPI(title="Planifiesta API", version="1.0.0")

init_db()
