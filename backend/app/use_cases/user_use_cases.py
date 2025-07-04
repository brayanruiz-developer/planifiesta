from app.infrastructure.repositories import UserRepository
from sqlalchemy.orm import Session
from app.domain.user import User
from typing import List


def create_user_use_case(db: Session, user: User) -> User:
    repo = UserRepository(db)
    return repo.create_user(user)


def get_all_users_use_case(db: Session) -> List[User]:
    repo = UserRepository(db)
    return repo.get_all_users()
