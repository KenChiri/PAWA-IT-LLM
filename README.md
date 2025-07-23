PAWA AI Assistant 

A modern, full-stack AI chat application built with a FastAPI/GraphQL backend and a Next.js/TailwindCSS frontend. This project demonstrates a clean architecture, real-time AI interaction, and a sleek, responsive user interface.


➡️ https://pawa-it-lmm-frontend.onrender.com/ View Live Demo 

Core Features
Real-Time AI Interaction: Get instant responses from a connected Large Language Model (Google Gemini or OpenAI).
Conversation History: Sessions are saved on the sidebar, allowing users to switch between different conversations.
Markdown & Code Formatting: Responses from the AI are beautifully rendered, including code blocks, lists, and other formatting.
Responsive UI: A modern, mobile-first design built with TailwindCSS that looks great on any device.
Live Typing Indicator: Enhances user experience by showing when the AI is processing a response.
GraphQL API: A robust and efficient API powered by FastAPI and Strawberry for clean data fetching.
Local History Persistence: Demonstrates backend skills by saving chat history to a local SQLite database.



Backend

Python 3.11+
FastAPI: For high-performance API development.
Strawberry: For a modern, Pythonic GraphQL implementation.
Gunicorn: As the production-grade WSGI server.
SQLite: For simple, file-based database persistence.
Google Gemini / OpenAI: As the LLM service.


Frontend:
Next.js 14+ (App Router)
React & TypeScript: For a type-safe and component-based UI.
TailwindCSS: For modern, utility-first styling.
Apollo Client: As a powerful GraphQL client for managing state and data fetching.
react-markdown: For rendering AI responses.


Getting Started
Follow these instructions to set up and run the project on your local machine.
Prerequisites
Node.js (v18.0 or later)
Python (v3.9 or later) & pip
1. Clone the Repository
   git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name


2. Backend Setup
First, let's get the Python server running.

cd backend

python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

# Install the required dependencies
pip install -r requirements.txt

# Create the environment file from the example
cp .env.example .env


Now, open the newly created .env file and add your AI provider's API key:
backend/.env


GEMINI_API_KEY="your_secret_gemini_key_here"


3. Frontend Setup
Now, in a separate terminal, let's set up the Next.js app.

# Navigate to the frontend directory from the root
cd frontend

# Install the required dependencies
npm install

# Create the local environment file from the example
cp .env.example .env.local



4. Running the Application
You need to run both the backend and frontend servers simultaneously.
Terminal 1 (Backend):

uvicorn app.main:app --reload


Terminal 2 (Frontend):

npm run dev

Deployment
This application is configured for easy deployment on Render.
Backend Service (FastAPI):
Repository: Connect your GitHub repo.
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
Environment Variables: Set GEMINI_API_KEY (or OPENAI_API_KEY) in the Render UI.
Frontend Service (Next.js):
Repository: Connect the same GitHub repo.
Root Directory: frontend
Build Command: npm install && npm run build
Start Command: npm start
Environment Variables: Set NEXT_PUBLIC_GRAPHQL_ENDPOINT to your live backend URL (e.g., https://....)



