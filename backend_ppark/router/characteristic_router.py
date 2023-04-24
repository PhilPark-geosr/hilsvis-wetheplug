from enum import Enum
import db.db_characteristic as characteristic
from db.database import  get_db
from fastapi import (APIRouter, Depends,  
                     HTTPException, status)
from sqlalchemy.orm.session import Session


class ApiType(str, Enum):
    AidsToNavigationArea = "AidsToNavigationArea"
    AidsToNavigationArea_png = "AidsToNavigationArea_png"
    AllRoute = "AllRoute"
    DesignatedRoute = "DesignatedRoute"
    ForecastCoastalArea = 'ForecastCoastalArea'
    ForecastRegionalArea = 'ForecastRegionalArea'
    KcgNonshipAccident = 'KcgNonshipAccident' 
    KcgShipAccident = 'KcgShipAccident'
    KmstShipAccident = 'KmstShipAccident'
    PassengerShipRoute = 'PassengerShipRoute'
    TrafficSaftetyDesignatedArea = 'TrafficSaftetyDesignatedArea'
    TssBoundary = 'TssBoundary'
    TssZone = 'TssZone'
    TwowayRoutePart = 'TwowayRoutePart'
    YachtRoute = 'YachtRoute'


router = APIRouter(
    prefix='/api2/characteristic', ## TODO: 뒤에 "/" 붙여야 하는지 확인해볼것
    tags= ['api2/characteristic']
)

@router.get('/{type}')
def get_charateristic_all(db:Session=Depends(get_db), type:ApiType = None):
    if type == 'AidsToNavigationArea':
        return characteristic.get_AidsToNavigationArea_all(db)
    elif type == 'AidsToNavigationArea_png':
        return characteristic.get_AidsToNavigationArea_all_aspng(db)
    elif type == 'AllRoute':
        return characteristic.get_AllRoute_all(db) 
    elif type == 'DesignatedRoute':
        return characteristic.get_DesignatedRoute_all(db) 
    elif type =='ForecastCoastalArea':
        return characteristic.get_ForecastCoastalArea_all(db)
    elif type =='ForecastRegionalArea':
        return characteristic.get_ForecastRegionalArea_all(db)
    elif type =='KcgNonshipAccident':
        return characteristic.get_KcgNonshipAccident_all(db) 
    
    elif type =='KcgShipAccident':
        return characteristic.get_KcgShipAccident_all(db) 
    elif type =='KmstShipAccident':
        return characteristic.get_KmstShipAccident_all(db) 
    elif type =='PassengerShipRoute':
        return characteristic.get_PassengerShipRoute_all(db) 
    elif type =='TrafficSaftetyDesignatedArea':
        return characteristic.get_TrafficSaftetyDesignatedArea_all(db) 
    
    elif type =='TssBoundary':
        return characteristic.get_TssBoundary_all(db) 
    elif type =='TssZone':
        return characteristic.get_TssZone_all(db) 
    elif type =='TwowayRoutePart':
        return characteristic.get_TwowayRoutePart_all(db) 
    elif type =='YachtRoute':
        return characteristic.get_YachtRoute_all(db) 
    else:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'APi with id {type} not found')
