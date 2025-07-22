from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Manages application-wide settings and configurations.
    Reads environment variables from a .env file.
    """
    PROJECT_NAME: str = "PAWA IT LLM"
    API_V1_STR: str = "/api/v1"
    # OPENAI_API_KEY: str
    GEMINI_API_KEY: str

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
