from sqlalchemy.orm.session import Session
from fastapi import HTTPException,status ## status code 관련
from fastapi.responses import HTMLResponse, PlainTextResponse, Response # Custom response
from model.model_conditions_tidal_streams import TideCurrent, RefTidalStation
from sqlalchemy import func
import geoalchemy2.functions as geofunc

def get_tide_current(db: Session, id:int):
    tide_current = db.query(TideCurrent).filter(TideCurrent.tide_current_id == id).first()
    # TODO: handle Errors
    if not tide_current:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'tide_current with id not found')
    print('tide_current.ref_tidal_station', dir(tide_current))
    # ref_tidal_station이 참조 등록되어 있어서 변수 참조가능 
    return tide_current
    
def get_tide_current_all(db: Session, header):
    tide_current = db.query(TideCurrent).all()
    # TODO: handle Errors
    if not tide_current:
        text = "tide current not found"
        return PlainTextResponse(status_code=404, content = text, media_type="text/plain")
    print('tide_current.ref_tidal_station', dir(tide_current))
    print(hasattr(tide_current, "__iter__")) ## 객체가 iterable인지 확인
    
    return tide_current
    # for html response
    # html = f'''
    #     <div>a</div>

    # '''
    # for elem in tide_current:
    #     print(dir(elem))
    #     html+=f"<div>{elem.number}</div>"
    
    # return Response(content= html, media_type="text/html", headers=header) # HTMLResponse(content= html, media_type="text/html") ## 이렇게 하면 헤더 전달 못받는다
    
def get_station(db:Session, number : str):
    station = db.query(RefTidalStation).filter(RefTidalStation.number == number).first()
    print('dict',station.__dict__, '----------')
    print('dir', dir(station))

    # Exception Handling
    if not station:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'{station} with id not found')
    
    ## station 에 current 변수가 등록되어 있어서 상호참조 가능
    ## tide_current 테이블의 current 변수를 참조 할 수 있음
    return station