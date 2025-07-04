from dataclasses import dataclass


@dataclass
class Event:
    event_id: int
    event_name: str
    event_state: bool = True
