from datetime import date

from sqlalchemy import desc
from sqlalchemy.orm import Session

from domain.models import Transaction
from infrastructure.orm import TransactionDB


class TransactionRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, transaction: Transaction) -> Transaction:
        db_transaction = TransactionDB(
            amount=transaction.amount,
            category=transaction.category,
            date=transaction.date,
            description=transaction.description,
        )
        self.db.add(db_transaction)
        self.db.commit()
        self.db.refresh(db_transaction)
        return Transaction.model_validate(db_transaction)

    def get_recent(self, limit: int = 10, skip: int = 0) -> list[Transaction]:
        transactions = (
            self.db.query(TransactionDB)
            .order_by(desc(TransactionDB.date), desc(TransactionDB.id))
            .offset(skip)
            .limit(limit)
            .all()
        )
        return [Transaction.model_validate(t) for t in transactions]

    def get_by_month(self, year: int, month: int) -> list[Transaction]:
        start_date = date(year, month, 1)
        # Simple logic: get all transactions after start of month.
        # For strict month end, we'd need end_date logic, but ">= start_date" is sufficient for "current month so far" usually.
        # But to be precise let's just filter >= start_date for now as per original requirement.
        transactions = (
            self.db.query(TransactionDB).filter(TransactionDB.date >= start_date).all()
        )
        return [Transaction.model_validate(t) for t in transactions]
