from app.infrastructure.repositories import EventRepository
from sqlalchemy.orm import Session


def get_all_events_use_case(db: Session):
    repo = EventRepository(db)
    return repo.get_all_events()
