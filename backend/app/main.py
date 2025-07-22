from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
from .schema import schema
from .core.config import settings
from fastapi.middleware.cors import CORSMiddleware

# Graphql Router
graphql_app = GraphQLRouter(schema)

# FastAPI app instance
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"

)
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

graphql_app = GraphQLRouter(schema)
# GraphQL route for the strawberry terminal
app.include_router(graphql_app, prefix="/graphql")


@app.get("/", tags=["Status Check"])
def read_root():
    """
    Root endpoint for basic health checks.
    Confirms that the server is running.
    """
    return {"status": "ok", "message": "Welcome to the AI Assistant API"}
