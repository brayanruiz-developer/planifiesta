from app.domain.budget_optimizer import BudgetOptimizer
from typing import Dict


def get_budget_status_use_case(day: int) -> Dict:
    return BudgetOptimizer.get_budget_status(day)
