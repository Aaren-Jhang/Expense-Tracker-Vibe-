# Database Connection & Migration Guide

這是關於本專案如何連接 PostgreSQL 資料庫以及為何修正後可以運作的說明。

## 1. 資料庫連線字串 (Database URL)

我們使用的連線字串格式如下：
```
postgresql://[user]:[password]@[host]:[port]/[database_name]
```

你目前的設定是：
```
DATABASE_URL=postgresql://aarenjhang@localhost:5432/postgres
```

-   **`postgresql://`**: 告訴 SQLAlchemy 我們要用 PostgreSQL 的驅動程式 (這裡是 `psycopg2`)。
-   **`aarenjhang`**: 你的系統使用者名稱。在 macOS 上安裝 Postgres (如透過 Homebrew)，預設都會直接建立一個與你系統同名的 Superuser。
-   **`@localhost:5432`**: 資料庫伺服器的位置（本機）與埠號。
-   **`/postgres`**: **資料庫名稱**。這是 PostgreSQL 安裝後預設一定會有的系統管理資料庫。

### 為什麼換成 `/postgres` 就通了？
先前我們嘗試連線到 `/expenses`，但我雖然執行了 `createdb expenses` 指令，可能因為權限或環境變數問題，實際上並沒有成功建立，或者 DataGrip 沒有正確連到它。
而 `/postgres` 是 PostgreSQL **預設存在** 的資料庫，所以當你把目標換成它，連線自然就成功了。

## 2. 關於 Migration (資料庫遷移)

### **我們有跑 Migration 嗎？**
嚴格來說，**沒有**使用標準的 Migration 工具（如 `Alembic`）。

我們使用的是 **SQLAlchemy 的 `create_all` 機制**。

在 `backend/main.py` 中有這行程式碼：
```python
# Create Database Tables
Base.metadata.create_all(bind=engine)
```

### **它的運作原理：**
1.  當 FastAPI App 啟動時，Python 會執行這行程式。
2.  SQLAlchemy 會檢查資料庫中是否已經存在 `models.py` 裡定義的 Table (`transactions`)。
3.  **如果不存在**，它就會發送 SQL `CREATE TABLE` 指令幫你建立。
4.  **如果已經存在**，它就會**什麼都不做** (它不會幫你修改欄位，也不會刪除)。

### **優缺點：**
-   **優點**：開發初期非常方便，不需要手動寫 SQL，也不用設定複雜的 Migration 工具，啟動就自動建表。
-   **缺點**：如果你之後修改了 `models.py` (例如新增一個 `note` 欄位)，`create_all` **不會** 幫你更新資料庫。你需要手動去資料庫加欄位，或者刪掉整張表讓它重蓋。

## 3. 專案中的連線流程
1.  **讀取設定**：`infrastructure/database.py` 讀取 `.env` 檔案中的 `DATABASE_URL`。
2.  **建立引擎**：`create_engine(DATABASE_URL)` 建立連線池。
3.  **ORM 定義**：`infrastructure/orm.py` 定義了 `TransactionDB` 對應到資料庫的 `transactions` 表。
4.  **自動建表**：`main.py` 啟動時呼叫 `create_all`，如果 `postgres` 資料庫裡沒有 `transactions` 表，就自動建立。
