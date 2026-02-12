from domain.models import Transaction
from infrastructure.repositories import TransactionRepository
from datetime import date

class TransactionService:
    def __init__(self, repository: TransactionRepository):
        self.repository = repository

    def create_transaction(self, transaction_data: Transaction) -> Transaction:
        return self.repository.create(transaction_data)

    def get_recent_transactions(self, skip: int = 0, limit: int = 10) -> list[Transaction]:
        return self.repository.get_recent(skip=skip, limit=limit)

    def get_monthly_summary(self) -> dict:
        today = date.today()
        transactions = self.repository.get_by_month(today.year, today.month)
        total_amount = sum(t.amount for t in transactions)
        
        return {
            "year": today.year,
            "month": today.month,
            "total_expenses": total_amount
        }
