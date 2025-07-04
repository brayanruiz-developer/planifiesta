from app.infrastructure.database import SessionLocal, init_db
from app.domain.event import Event
from app.infrastructure.repositories import EventRepository


def seed_events():
    db = SessionLocal()
    repo = EventRepository(db)
    existing = repo.get_all_events()
    if not existing:
        repo.create_event(Event(event_id=0, event_name="Evento 1"))
        repo.create_event(Event(event_id=0, event_name="Evento 2"))
        repo.create_event(Event(event_id=0, event_name="Evento 3"))
    db.close()


if __name__ == "__main__":
    init_db()
    seed_events()
