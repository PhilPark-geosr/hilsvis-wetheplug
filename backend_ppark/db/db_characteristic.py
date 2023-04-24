from sqlalchemy.orm.session import Session
from sqlalchemy import *
from fastapi import HTTPException,status , Response## status code 관련
from fastapi.responses import StreamingResponse
# 모델 클래스 임포트
from model.model_characteristics_zones import * #모든 모델 임포트
from model.model_characteristics_routes import * #모든 모델 임포트
from model.model_characteristics_accidents import * #모든 모델 임포트
# ORM 
from sqlalchemy import func
import geoalchemy2.functions as geofunc
# ETC
import json
from starlette.config import Config
from starlette.datastructures import Secret
from io import BytesIO
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

# from typing import str

# json 데이터로 변환하기 위한 데이터 구조 미리 정의
json_form = {
            "type": "FeatureCollection",
            "features":[]       
        }

# -------------------- characteristics_zones -------------------------------#
def get_AidsToNavigationArea_all(db: Session):
    data = db.query(geofunc.ST_AsGeoJSON(AidsToNavigationArea.geometry)).all()
    json_data = json_form

    # Exception handling
    if not data:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'요청하는 자료가 존재하지 않습니다')
    
    # if data exists...
    for elem in data:
        # print(coast)
        json_data['features'].append(
            {
           'type': 'Feature',
            'properties': {},
            "geometry" : json.loads(elem[0])
            }
        )
    
    return json_data


## PNG Response
def get_AidsToNavigationArea_all_aspng(db: Session):
    
    ## 지우지 말것!!!
    ## for with not ORM
    # as png black color
    # sqlstatement = '''
    # SET postgis.gdal_enabled_drivers = 'ENABLE_ALL';
    # SELECT ST_AsPNG(ST_AsRaster(characteristics_zones.aids_to_navigation_areas.geometry,2164, 3065)) FROM characteristics_zones.aids_to_navigation_areas;
    # '''
    # as colormap
    # sqlstatement = '''
    # SET postgis.gdal_enabled_drivers = 'ENABLE_ALL';
    # SELECT ST_AsPNG(ST_ColorMap(ST_AsRaster(characteristics_zones.aids_to_navigation_areas.geometry,2164, 3065),1, 'bluered')) FROM characteristics_zones.aids_to_navigation_areas;
    # '''
    # with engine.connect() as con:
    #     data = con.execute(sqlstatement)
    # image_data = data.fetchone()[0]

    ## with ORM
    image_data = db.query(geofunc.ST_AsPNG(geofunc.ST_ColorMap(geofunc.ST_AsRaster(AidsToNavigationArea.geometry, 2164, 3065),1, 'bluered'))).first()
    # print(image_data)

    stream = BytesIO(image_data[0])
    return StreamingResponse(stream, media_type='image/png')
    
def get_ForecastCoastalArea_all(db: Session):
    data = db.query(geofunc.ST_AsGeoJSON(ForecastCoastalArea.geometry)).all()
    json_data = json_form

    # Exception handling
    if not data:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'요청하는 자료가 존재하지 않습니다')
    
    # if data exists...
    for elem in data:
        # print(coast)
        json_data['features'].append(
            {
           'type': 'Feature',
            'properties': {},
            "geometry" : json.loads(elem[0])
            }
        )
    
    return json_data

def get_ForecastRegionalArea_all(db: Session):
    data = db.query(geofunc.ST_AsGeoJSON(ForecastRegionalArea.geometry)).all()
    json_data = json_form

    # Exception handling
    if not data:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'요청하는 자료가 존재하지 않습니다')
    
    # if data exists...
    for elem in data:
        # print(coast)
        json_data['features'].append(
            {
           'type': 'Feature',
            'properties': {},
            "geometry" : json.loads(elem[0])
            }
        )
    
    return json_data

def get_TrafficSaftetyDesignatedArea_all(db: Session):
    data = db.query(geofunc.ST_AsGeoJSON(TrafficSaftetyDesignatedArea.geometry)).all()
    json_data = json_form

    # Exception handling
    if not data:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'요청하는 자료가 존재하지 않습니다')
    
    # if data exists...
    for elem in data:
        # print(coast)
        json_data['features'].append(
            {
           'type': 'Feature',
            'properties': {},
            "geometry" : json.loads(elem[0])
            }
        )
    
    return json_data

def get_TssBoundary_all(db: Session):
    data = db.query(geofunc.ST_AsGeoJSON(TssBoundary.geometry)).all()
    json_data = json_form

    # Exception handling
    if not data:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'요청하는 자료가 존재하지 않습니다')
    
    # if data exists...
    for elem in data:
        # print(coast)
        json_data['features'].append(
            {
           'type': 'Feature',
            'properties': {},
            "geometry" : json.loads(elem[0])
            }
        )
    
    return json_data

def get_TssZone_all(db: Session):
    data = db.query(geofunc.ST_AsGeoJSON(TssZone.geometry)).all()
    json_data = json_form

    # Exception handling
    if not data:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'요청하는 자료가 존재하지 않습니다')
    
    # if data exists...
    for elem in data:
        # print(coast)
        json_data['features'].append(
            {
           'type': 'Feature',
            'properties': {},
            "geometry" : json.loads(elem[0])
            }
        )
    
    return json_data

# -------------------- characteristics_routes -------------------------------#
def get_AllRoute_all(db: Session):
    data = db.query(geofunc.ST_AsGeoJSON(AllRoute.geometry)).all()
    json_data = json_form

    # Exception handling
    if not data:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'요청하는 자료가 존재하지 않습니다')
    
    # if data exists...
    for elem in data:
        # print(coast)
        json_data['features'].append(
            {
           'type': 'Feature',
            'properties': {},
            "geometry" : json.loads(elem[0])
            }
        )
    
    return json_data

def get_DesignatedRoute_all(db: Session):
    data = db.query(geofunc.ST_AsGeoJSON(DesignatedRoute.geometry)).all()
    json_data = json_form

    # Exception handling
    if not data:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'요청하는 자료가 존재하지 않습니다')
    
    # if data exists...
    for elem in data:
        # print(coast)
        json_data['features'].append(
            {
           'type': 'Feature',
            'properties': {},
            "geometry" : json.loads(elem[0])
            }
        )
    
    return json_data

def get_PassengerShipRoute_all(db: Session):
    data = db.query(geofunc.ST_AsGeoJSON(PassengerShipRoute.geometry)).all()
    json_data = json_form

    # Exception handling
    if not data:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'요청하는 자료가 존재하지 않습니다')
    
    # if data exists...
    for elem in data:
        # print(coast)
        json_data['features'].append(
            {
           'type': 'Feature',
            'properties': {},
            "geometry" : json.loads(elem[0])
            }
        )
    
    return json_data

def get_TwowayRoutePart_all(db: Session):
    data = db.query(geofunc.ST_AsGeoJSON(TwowayRoutePart.geometry)).all()
    json_data = json_form

    # Exception handling
    if not data:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'요청하는 자료가 존재하지 않습니다')
    
    # if data exists...
    for elem in data:
        # print(coast)
        json_data['features'].append(
            {
           'type': 'Feature',
            'properties': {},
            "geometry" : json.loads(elem[0])
            }
        )
    
    return json_data

def get_YachtRoute_all(db: Session):
    data = db.query(geofunc.ST_AsGeoJSON(YachtRoute.geometry)).all()
    json_data = json_form

    # Exception handling
    if not data:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'요청하는 자료가 존재하지 않습니다')
    
    # if data exists...
    for elem in data:
        # print(coast)
        json_data['features'].append(
            {
           'type': 'Feature',
            'properties': {},
            "geometry" : json.loads(elem[0])
            }
        )
    
    return json_data

# -------------------- characteristics_accidents -------------------------------#

def get_KcgNonshipAccident_all(db: Session):
    data = db.query(geofunc.ST_AsGeoJSON(KcgNonshipAccident.geometry)).all()
    json_data = json_form

    # Exception handling
    if not data:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'요청하는 자료가 존재하지 않습니다')
    
    # if data exists...
    for elem in data:
        # print(coast)
        json_data['features'].append(
            {
           'type': 'Feature',
            'properties': {},
            "geometry" : json.loads(elem[0])
            }
        )
    
    return json_data

def get_KcgShipAccident_all(db: Session):
    data = db.query(geofunc.ST_AsGeoJSON(KcgShipAccident.geometry)).all()
    json_data = json_form

    # Exception handling
    if not data:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'요청하는 자료가 존재하지 않습니다')
    
    # if data exists...
    for elem in data:
        # print(coast)
        json_data['features'].append(
            {
           'type': 'Feature',
            'properties': {},
            "geometry" : json.loads(elem[0])
            }
        )
    
    return json_data

def get_KmstShipAccident_all(db: Session):
    data = db.query(geofunc.ST_AsGeoJSON(KmstShipAccident.geometry)).all()
    json_data = json_form

    # Exception handling
    if not data:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'요청하는 자료가 존재하지 않습니다')
    
    # if data exists...
    for elem in data:
        # print(coast)
        json_data['features'].append(
            {
           'type': 'Feature',
            'properties': {},
            "geometry" : json.loads(elem[0])
            }
        )
    
    return json_data