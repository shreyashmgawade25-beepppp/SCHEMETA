from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "SCHEMETA API"
    environment: str = "development"
    database_url: str
    jwt_secret_key: str
    access_token_expire_minutes: int = 60
    cors_origins: str = "http://localhost:5173"
    llm_api_key: str | None = None
    llm_provider: str | None = None
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

settings = Settings()
