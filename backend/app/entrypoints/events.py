from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.infrastructure.database import SessionLocal
from app.use_cases.get_events import get_all_events_use_case
from app.domain.event import Event

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/events", response_model=list[Event])
def get_events(db: Session = Depends(get_db)):
    return get_all_events_use_case(db)
