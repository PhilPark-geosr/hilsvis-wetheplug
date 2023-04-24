import os
import glob
from sqlalchemy import *
import pandas as pd
from starlette.config import Config
from starlette.datastructures import Secret


# Config information
config = Config(".env")

db_user = config("PG_USER", cast=str)
db_password = config("PG_PASSWORD", cast=Secret)
db_host = config("PG_HOST", cast=str)
# db_host = 'localhost'
db_port = config("PG_PORT", cast=str, default="5432")
db_database1 = config("PG_DB1", cast=str)
db_database2 = config("PG_DB2", cast=str)

# DB connection
conn_str = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_database2}"
engine = create_engine(conn_str)


# schema name
schema_name = "conditions_tidal_streams"

# Create data ref table
df = pd.read_csv(
"csv/ref_tidal_stations.csv", encoding = 'euckr')
df.columns = map(str.lower, df.columns)
df = df.drop_duplicates(['number'],keep='last') # 중복 제거 --> pk 조건 만족하도록
df = df.set_index('number')

name = 'ref_tidal_stations'
name = name.lower()
print(name , df.index.name)

# print(df)
df.to_sql(name = name,
        con = engine,
        schema = schema_name,
        if_exists = 'replace',
        index = True
        )

with engine.connect() as con:
    con.execute(f'''ALTER TABLE {schema_name}.{name}
                ADD PRIMARY KEY({df.index.name});
                ''')
    
    print('upload complete')
    
# Make tide_current table
df = pd.read_csv(
"./csv/tide_current.csv", encoding = 'euckr')

df.columns = map(str.lower, df.columns)
name = "tide_current"
name = name.lower()
print(name)

# deckgl 좌표계에 맞게 변경

df.index.name = name+'_id'
foreinkey_col = 'number'
print(df)
df.to_sql(name = name,
        con = engine,
        schema = schema_name,
        if_exists = 'replace',
          index = True
          )
sqlstatement = f'''ALTER TABLE {schema_name}.{name}
                        ADD PRIMARY KEY({df.index.name}),
                        ADD CONSTRAINT fk_orders_customers 
                        FOREIGN KEY (number) 
                        REFERENCES {schema_name}.ref_tidal_stations (number);'''
with engine.connect() as con:
    con.execute(sqlstatement)
   
    print('upload complete')

# Make ref_tidal_stations table
