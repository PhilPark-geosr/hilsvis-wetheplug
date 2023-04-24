from app.db.repositories.base import BaseRepository

GET_CHARCTERISTIC_BY_SCHEMA_AND_TABLE_NAMES = """
  SELECT json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(ST_AsGeoJson(t.*)::json)
  )
  FROM (
    SELECT geometry FROM :schema_name.:table_name
  ) AS t;
"""


class CharacteristicsRepository(BaseRepository):
    """
    All database actions associated with the Characteristic resource
    """

    # get characteristic by schema and table name
    async def get_characteristic_by_schema_and_table_name(
        self,
        *,
        schema_name: str,
        table_name: str,
    ):
        record = await self.db.fetch_one(
            query=GET_CHARCTERISTIC_BY_SCHEMA_AND_TABLE_NAMES,
            values={
                "schema_name": schema_name,
                "table_name": table_name,
            },
        )

        if not record:
            return None

        return record[0]
