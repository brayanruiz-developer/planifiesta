from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.infrastructure.database import SessionLocal
from app.use_cases.user_use_cases import create_user_use_case, get_all_users_use_case
from app.domain.user import User
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class UserResponse(BaseModel):
    user_id: int
    user_name: str
    user_invitation_description: str
    user_invitation_state: Optional[bool]
    event_id: int
    event_name: Optional[str]


@router.post("/users", response_model=User)
def create_user(user: User, db: Session = Depends(get_db)):
    return create_user_use_case(db, user)


@router.get("/users", response_model=List[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return get_all_users_use_case(db)
