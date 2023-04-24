import geopandas as gpd
import os
import glob
from sqlalchemy import *
from starlette.config import Config
from starlette.datastructures import Secret
import csv
import os

folder_path = 'shp'
flist = glob.glob(folder_path+'/**/*.shp', recursive=True)

# Config information
config = Config(".env")

db_user = config("PG_USER", cast=str)
db_password = config("PG_PASSWORD", cast=Secret)
# db_host = config("PG_HOST", cast=str)
db_host = 'localhost'
db_port = config("PG_PORT", cast=str, default="5432")
db_database1 = config("PG_DB1", cast=str)
db_database2 = config("PG_DB2", cast=str)

# DB connection
conn_str = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_database2}"
print(flist)
engine = create_engine(conn_str)

# read mapping table
mapping_dict = dict()
with open('info/shapefiles_to_db_mapping_table.csv', 'r', encoding='euc-kr') as f:
    reader = csv.reader(f)
    for i , line in enumerate(reader):
        if i == 0: #첫줄 스킵(이유 : 헤더정보)
            continue
        _, _, schema_name, filename = line
        filename = filename.split('.')[0]
        mapping_dict[filename] = schema_name

print(mapping_dict)

for shp in flist:
    print(shp)
    # gdf = gpd.read_file(shp, encoding='latin1')
    try:
        gdf = gpd.read_file(shp, encoding='latin1') ##인코딩 다 말해주어야 함
    except:
        gdf = gpd.read_file(shp, encoding='euckr')

    gdf = gdf[['geometry']] ## geometry 만 추출 안할시 모든 col 영어로 바꾸어야 함
    name = shp.split('\\')[-1][:-4]
    name = name.lower()
    # print(gdf.crs)

    # deckgl 좌표계에 맞게 변경
    gdf = gdf.to_crs(4179)
    gdf.index.name = name+'_id'

    #스키마 이름 지정
    schema_name = mapping_dict[name]
    print(name, schema_name) 
    # db 업로드
    gdf.to_postgis(con=engine, schema=schema_name, name=name, if_exists="replace", index=True)
    
    # shp파일은 primarykey를 따로 생성해 주어야 한다.. 그렇지 않으면 model class로 정의 안됨
    # primary key 생성
    with engine.connect() as con:
        con.execute(f'ALTER TABLE {schema_name}.{name} ADD PRIMARY KEY({gdf.index.name});')
    print('upload complete')