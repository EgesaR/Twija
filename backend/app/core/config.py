from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path


class Settings(BaseSettings):
    supabase_url: str = Field(validation_alias="SUPABASE_URL")
    supabase_anon_key: str = Field(validation_alias="SUPABASE_ANON_KEY")
    supabase_service_role_key: str = Field(
        validation_alias="SUPABASE_SERVICE_ROLE_KEY")

    model_config = SettingsConfigDict(
        env_file=str(
            Path("backend/.env") if Path("backend/.env").exists() else Path(".env")
        ),  #str(Path(".env")),
        case_sensitive=False,
        extra="ignore",
    )


settings = Settings()  # type: ignore[call-arg]
