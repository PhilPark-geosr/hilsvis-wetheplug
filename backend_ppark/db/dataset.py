from model.models import Typoon, Dataset, Path
from sqlalchemy.orm.session import Session
from fastapi import HTTPException,status ## status code 관련
from sqlalchemy import func
import geoalchemy2.functions as geofunc
import json
# db.session.scalar(geofunc.ST_AsGeoJSON(my_geometry))import geoalchemy2.functions as geofunc

# db.session.scalar(geofunc.ST_AsGeoJSON(my_geometry))
def get_typhoon(db: Session, id:int):
    typhoon = db.query(Typoon).filter(Typoon.typoon_id   == id).first()
    # TODO: handle Errors
    if not typhoon:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'Typhoon with id {id} not found')
    return typhoon

def get_datasets(db: Session, id:int):
    datasets = db.query(Dataset).filter(Dataset.dataset_id == id).first()
    # TODO: handle Errors
    if not datasets:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'Typhoon with id {id} not found')
    return datasets

def get_paths(db: Session, id:int):
    paths = db.query(Path).filter(Path.typoon_id == id).all()
    path_json = {
        "type": "FeatureCollection",
        "features": []
    }
    for obj in paths:
        path_json['features'].append({
            "type": 'Feature',
            "properties": {
            "태풍아이디": obj.typoon_id,
            "일시": obj.datetime,
            "기압": obj.kma_pres,
            "풍속": obj.kma_wind,
            "강풍반경": obj.kma_r15,
            "강도": obj.kma_grade,
            },
            "geometry": {
            "type": 'Point',
            "coordinates": [obj.lon, obj.lat],
            },
        })

    # TODO: handle Errors
    if not paths:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'paths with id {id} not found')
    return path_json