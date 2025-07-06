from fastapi import APIRouter, HTTPException
from app.use_cases.budget_optimizer_use_case import get_budget_status_use_case

router = APIRouter()


@router.get("/budget-status/{day}")
def get_budget_status(day: int):
    try:
        return get_budget_status_use_case(day)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
