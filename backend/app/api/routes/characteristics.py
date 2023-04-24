from fastapi import APIRouter, Depends, HTTPException, Path, Response
from starlette.status import HTTP_404_NOT_FOUND

from app.api.dependencies.database import get_repository
from app.db.repositories.characteristics import CharacteristicsRepository


router = APIRouter()


# get characteristic by schema and table name
@router.get("/schema/{schema_name}/table/{table_name}")
async def get_characteristic_by_schema_and_table_name(
    characteristics_repo: CharacteristicsRepository = Depends(get_repository(CharacteristicsRepository)),
):
    return await characteristics_repo.get_characteristic_by_schema_and_table_name()
