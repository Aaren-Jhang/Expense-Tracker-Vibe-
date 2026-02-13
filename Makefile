
# Default target
.PHONY: all
all: install start

# Install dependencies
.PHONY: install
install:
	cd backend && python3 -m venv venv && ./venv/bin/pip install -r requirements.txt
	cd frontend && npm install

# Install development dependencies (including formatters)
.PHONY: install-dev
install-dev: install
	cd backend && ./venv/bin/pip install black isort flake8

# Start both servers in parallel
.PHONY: start
start:
	@echo "Starting backend and frontend..."
	@make -j 2 run-backend run-frontend

# Start backend server
.PHONY: run-backend
run-backend:
	cd backend && ./venv/bin/uvicorn main:app --reload --port 8000

# Start frontend server
.PHONY: run-frontend
run-frontend:
	cd frontend && npm run dev

# Format code
.PHONY: format
format:
	cd backend && ./venv/bin/black .
	cd backend && ./venv/bin/isort .

# Lint code
.PHONY: lint
lint:
	cd backend && ./venv/bin/flake8 .
