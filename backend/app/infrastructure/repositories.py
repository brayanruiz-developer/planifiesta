from sqlalchemy.orm import Session
from .models import EventModel
from app.domain.event import Event


class EventRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_event(self, event: Event) -> Event:
        db_event = EventModel(event_name=event.event_name, event_state=event.event_state)
        self.db.add(db_event)
        self.db.commit()
        self.db.refresh(db_event)
        return Event(event_id=db_event.event_id, event_name=db_event.event_name, event_state=db_event.event_state)

    def get_all_events(self):
        events = self.db.query(EventModel).all()
        return [Event(event_id=e.event_id, event_name=e.event_name, event_state=e.event_state) for e in events]
