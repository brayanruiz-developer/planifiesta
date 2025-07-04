from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class EventModel(Base):
    __tablename__ = "events"
    event_id = Column(Integer, primary_key=True, autoincrement=True)
    event_name = Column(String(100), nullable=False)
    event_state = Column(Boolean, nullable=False, default=True)


class UserModel(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    user_name = Column(String(100), nullable=False)
    user_invitation_description = Column(String(200), nullable=False)
    user_invitation_state = Column(Boolean, nullable=True)
    event_id = Column(Integer, ForeignKey("events.event_id"), nullable=False)

    event = relationship("EventModel", backref="users")
