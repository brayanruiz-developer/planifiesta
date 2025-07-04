from dataclasses import dataclass
from typing import Optional


@dataclass
class User:
    user_id: int
    user_name: str
    user_invitation_description: str
    user_invitation_state: Optional[bool]
    event_id: int
    event_name: Optional[str] = None
