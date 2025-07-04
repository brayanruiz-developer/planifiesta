from sqlalchemy.orm import Session
from .models import EventModel, UserModel
from app.domain.event import Event
from app.domain.user import User


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


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user: User) -> User:
        db_user = UserModel(
            user_name=user.user_name,
            user_invitation_description=user.user_invitation_description,
            user_invitation_state=user.user_invitation_state,
            event_id=user.event_id
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return User(
            user_id=db_user.user_id,
            user_name=db_user.user_name,
            user_invitation_description=db_user.user_invitation_description,
            user_invitation_state=db_user.user_invitation_state,
            event_id=db_user.event_id
        )

    def get_all_users(self):
        users = self.db.query(UserModel).all()
        return [
            User(
                user_id=u.user_id,
                user_name=u.user_name,
                user_invitation_description=u.user_invitation_description,
                user_invitation_state=u.user_invitation_state,
                event_id=u.event_id,
                event_name=u.event.event_name if u.event else None
            ) for u in users
        ]
