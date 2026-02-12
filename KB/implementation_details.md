# Nature-Themed Expense Tracker - Implementation & Technical Details

## 1. 專案架構 (Project Architecture)

本專案採用前後端分離架構 (Client-Server Architecture)，後端導入 **Domain-Driven Design (DDD)** 分層架構，旨在提供清晰的職責劃分與良好的擴展性。

- **Root Directory**: `/Users/aarenjhang/Desktop/Side/Calculate app`
- **Backend Directory**: `/backend` (Python/FastAPI)
- **Frontend Directory**: `/frontend` (TypeScript/React)

### 1.1 資料流 (Data Flow)
1.  **Interface Layer (API)**: 接收前端 HTTP 請求。
2.  **Application Layer (Service)**: 處理業務邏輯 (如計算總和)。
3.  **Infrastructure Layer (Repository)**: 透過 ORM (SQLAlchemy) 與 PostgreSQL 資料庫互動。
4.  **Domain Layer (Entity)**: 定義核心業務物件 (`Transaction`).

---

## 2. 後端技術棧 (Backend Stack)

- **Language**: Python 3.x
- **Framework**: **FastAPI**
- **Architecture**: **DDD (Domain-Driven Design)**
    - `domain/`: 核心業務模型。
    - `infrastructure/`: 資料庫連線、ORM、Repositories。
    - `application/`: 應用服務層。
    - `interfaces/`: API 路由與控制器。
- **Database**: **PostgreSQL**
    - 強大的關聯式資料庫。
    - Port: `5432` (Default).
- **ORM**: **SQLAlchemy**
- **Schema Validation**: **Pydantic**
- **Environment**:使用 `.env` 管理資料庫連線字串 (`DATABASE_URL`).

### Database Connection
使用 `psycopg2-binary` 作為驅動，透過 `infrastructure/database.py` 建立連線池。

### API Endpoints
- `POST /api/transactions`: 新增一筆交易。
- `GET /api/transactions`: 取得最近 10 筆交易 (分頁支援)。
- `GET /api/summary`: 計算本月總支出。

---

## 3. 前端技術棧 (Frontend Stack)

- **Language**: TypeScript
- **Framework**: **React** (v18+)
- **Build Tool**: **Vite**
- **Styling**: **Tailwind CSS** (v4)
    - 設定檔: `index.css` (使用 `@theme` 指令)。
    - 自定義主題顏色:
        - `forest-green`: `#2D5A27`
        - `water-blue`: `#E0F7FA`

### 主要組件 (Components)
- **App.tsx**: 應用程式主入口。
- **api.ts**: 與後端 API 溝通的 Client。
- **Summary.tsx**: 顯示本月總支出。
- **TransactionForm.tsx**: 新增交易表單。
- **TransactionList.tsx**: 交易列表。

---

## 4. UI/UX 設計理念

- **主題**: 大自然 (Nature)
- **配色策略**: 森林綠 + 水波藍。
- **視覺元素**: 圓角設計、大量留白。

## 5. 開發與執行 (Development)

我們使用 `Makefile` 來簡化開發流程。

### 一鍵啟動 (推薦)
```bash
make start
```
這會同時啟動 Backend (Port 8000) 與 Frontend (Port 5173)。

### 手動啟動
**Backend**:
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

**Frontend**:
```bash
cd frontend
npm run dev
```
