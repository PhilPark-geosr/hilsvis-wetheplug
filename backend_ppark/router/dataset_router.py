from fastapi import APIRouter
from sqlalchemy.orm.session import Session
from fastapi import Depends, APIRouter,Header,Cookie
from fastapi.responses import Response
from enum import Enum
import db.dataset as dataset
import db.db_tide_current as db_tide_current
from db.database import get_db
from fastapi import HTTPException,status ## status code 관련
from typing import Optional, List
# path parameter predefined
class ApiType(str, Enum):
    typhoon = "typhoon"
    dataset = "dataset"
    paths = "paths"
    tide_current = 'tide_current'

router = APIRouter(
    prefix='/api2',
    tags= ['api2']
)
@router.get("") #이렇게 맨끝 슬래쉬를 지워줘야 된다!
def api():
    return "api"
@router.get('/tide_station')
def get_station(number : str, db:Session=Depends(get_db)):
    return db_tide_current.get_station(db,number)

@router.get('/tide_current_all', responses = {
    200: {
        "content" : {
            "text/html": {
               "example" : "<div>tide current</div>"
            }
        },
        "description" : "Returns the HTML Response"
    },
    404 : {
        "content" : {
            "text/plain": {
               "example" : "tide current not found"
            }
        },
        "description" : "text error message"
    }
})

## TODO: response header에 헤더내용 표출될 수 있도록...
def get_tide_current_all(
    response: Response, 
    custom_header : Optional[List[str]] = Header(None),
    db:Session=Depends(get_db)
  ):
    
    # response.headers['custom_response_header'] ="and".join(custom_header)
    header = response.headers
    return db_tide_current.get_tide_current_all(db, header)

@router.get('/witheader')
def get_headers(response:Response,
                custom_header : Optional[List[str]] = Header(None),
                test_cookie : Optional[str] = Cookie(None)
                ):
    response.headers['custom_response_header'] ="and".join(custom_header)
    response.set_cookie(key='test_cookie', value = "nice")
    return {
        'custom_header' : custom_header,
        'my_cookie': test_cookie,
    }


@router.get('/{type}')
def get_api(id:int, db:Session=Depends(get_db), type:ApiType = None):
    if type == 'dataset':
        return dataset.get_datasets(db, id)
    elif type == 'typhoon':
        return dataset.get_typhoon(db, id)
    elif type == 'paths':
        return dataset.get_paths(db, id)
    elif type =='tide_current':
        return db_tide_current.get_tide_current(db,id)
    else:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'APi with id {type} not found')
