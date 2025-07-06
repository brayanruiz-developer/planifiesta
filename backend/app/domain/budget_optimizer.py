from dataclasses import dataclass
from typing import List, Dict


@dataclass(frozen=True)
class Contribution:
    day: int
    amount: int


@dataclass(frozen=True)
class CostBracket:
    start_day: int
    end_day: int
    catering_per_day: int
    decoration_per_day: int


class BudgetOptimizer:
    INITIAL_BUDGET = 3000000
    DEADLINE = 60
    COST_BRACKETS = [
        CostBracket(1, 20, 50000, 25000),
        CostBracket(21, 40, 55000, 27000),
        CostBracket(41, 60, 60000, 28000),
    ]
    CONTRIBUTIONS = [
        Contribution(10, 500000),
        Contribution(15, 300000),
        Contribution(25, 450000),
        Contribution(40, 500000),
        Contribution(50, 250000),
    ]

    # Precalculate totals and contributions per day
    _contributions_total_by_day = [0] * (DEADLINE + 2)
    _contributions_history_by_day = [[] for _ in range(DEADLINE + 2)]
    _precalculated = False

    @classmethod
    def _precalculate_contributions(cls):
        if cls._precalculated:
            return
        total = 0
        history = []
        contribs_sorted = sorted(cls.CONTRIBUTIONS, key=lambda c: c.day)
        idx = 0
        for day in range(1, cls.DEADLINE + 1):
            # Add all contributions from this day
            while idx < len(contribs_sorted) and contribs_sorted[idx].day == day:
                total += contribs_sorted[idx].amount
                history.append(contribs_sorted[idx])
                idx += 1
            cls._contributions_total_by_day[day] = total
            cls._contributions_history_by_day[day] = list(history)
        cls._precalculated = True

    @classmethod
    def get_contributions_up_to(cls, day: int) -> List[Contribution]:
        cls._precalculate_contributions()
        return cls._contributions_history_by_day[day]

    @classmethod
    def get_total_contributions_up_to(cls, day: int) -> int:
        cls._precalculate_contributions()
        return cls._contributions_total_by_day[day]

    @classmethod
    def get_total_cost_up_to(cls, day: int) -> int:
        total = 0
        for bracket in cls.COST_BRACKETS:
            if day >= bracket.start_day:
                days_in_bracket = min(day, bracket.end_day) - bracket.start_day + 1
                if days_in_bracket > 0:
                    total += days_in_bracket * (bracket.catering_per_day + bracket.decoration_per_day)
        return total

    @classmethod
    def get_budget_status(cls, day: int) -> Dict:
        if not (1 <= day <= cls.DEADLINE):
            raise ValueError("Día fuera de rango")
        total_cost = cls.get_total_cost_up_to(day)
        total_contributions = cls.get_total_contributions_up_to(day)
        remaining_budget = cls.INITIAL_BUDGET + total_contributions - total_cost
        contributions_history = [c.__dict__ for c in cls.get_contributions_up_to(day)]
        return {
            "total_cost": total_cost,
            "remaining_budget": remaining_budget,
            "contributions_history": contributions_history
        }
