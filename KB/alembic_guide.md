# Alembic Database Migration Guide

本專案已設定好 **Alembic** 來管理資料庫 Schema 變更。

## 常用指令

### 1. 產生新的 Migration
當你修改了 `backend/domain/models.py` 或 `backend/infrastructure/orm.py` 後，執行：

```bash
cd backend
# -m 後面是你的變更說明
./venv/bin/alembic revision --autogenerate -m "Add new column or table"
```

這會在 `backend/alembic/versions/` 下產生一個新的 Python script。**請務必檢查該檔案內容**，確認自動產生的變更符合預期。

### 2. 套用變更 (Upgrade)
要將最新的變更套用到資料庫：

```bash
cd backend
./venv/bin/alembic upgrade head
```

### 3. 回滾變更 (Downgrade)
若要悔棋，退回到上一個版本：

```bash
cd backend
./venv/bin/alembic downgrade -1
```

## 注意事項
-   `--autogenerate` 非常好用，但**不是萬能**。複雜的變更（如修改欄位型態、重新命名）有時需要手動編輯產生的 migration script。
-   請確保 `.env` 中的 `DATABASE_URL` 是正確的，Alembic 會讀取它來連線。
