from datetime import date

from pydantic import BaseModel


class Transaction(BaseModel):
    """
    Domain Entity representing a Transaction.
    Using Pydantic for validation and serialization ease,
    though pure dataclasses are also common in strict DDD.
    """

    id: int | None = None
    amount: float
    category: str
    date: date
    description: str | None = None

    class Config:
        from_attributes = True
