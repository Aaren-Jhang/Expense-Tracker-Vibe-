from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from application.services import TransactionService
from domain.models import Transaction
from infrastructure.database import get_db
from infrastructure.repositories import TransactionRepository

router = APIRouter()


def get_transaction_service(db: Session = Depends(get_db)) -> TransactionService:
    repository = TransactionRepository(db)
    return TransactionService(repository)


@router.post("/transactions", response_model=Transaction)
def create_transaction(
    transaction: Transaction,
    service: TransactionService = Depends(get_transaction_service),
):
    return service.create_transaction(transaction)


@router.get("/transactions", response_model=list[Transaction])
def get_transactions(
    skip: int = 0,
    limit: int = 10,
    service: TransactionService = Depends(get_transaction_service),
):
    return service.get_recent_transactions(skip=skip, limit=limit)


@router.get("/summary")
def get_summary(service: TransactionService = Depends(get_transaction_service)):
    return service.get_monthly_summary()
