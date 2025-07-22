import strawberry
import typing
from . import services

# --- GraphQL Object Types ---

@strawberry.type
class ChatMessage:
    """Represents a single message in the chat history."""
    role: str
    content: str

@strawberry.type
class ChatResponse:
    """The response from the AI, including the updated history."""
    answer: str
    history: typing.List[ChatMessage]

# --- GraphQL Input Types ---

@strawberry.input
class ChatMessageInput:
    """Input type for a single chat message."""
    role: str
    content: str

@strawberry.input
class AskQuestionInput:
    """Input for the ask_question mutation, including the new question and prior history."""
    question: str
    history: typing.List[ChatMessageInput]

# --- GraphQL Root Types (Query and Mutation) ---

@strawberry.type
class Query:
    @strawberry.field
    def hello(self) -> str:
        """A simple health-check query."""
        return "The GraphQL server is running."

@strawberry.type
class Mutation:
    @strawberry.mutation
    def ask_question(self, input: AskQuestionInput) -> ChatResponse:
        """
        Processes a user's question, considers the history, and returns the AI's answer.
        """
        # Convert input history from Strawberry objects to standard dicts for the service
        history_dicts = [{"role": msg.role, "content": msg.content} for msg in input.history]

        # Call our LLM service with the question and history
        answer = services.get_llm_response(input.question, history_dicts)

        # Construct the new history
        updated_history = [
            *input.history,
            ChatMessage(role="user", content=input.question),
            ChatMessage(role="assistant", content=answer),
        ]

        # Return the AI's answer and the new, complete history
        return ChatResponse(answer=answer, history=updated_history)

# --- Schema Definition ---
schema = strawberry.Schema(query=Query, mutation=Mutation)

