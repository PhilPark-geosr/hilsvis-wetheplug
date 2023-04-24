from typing import Union, Optional
from fastapi import FastAPI, Depends, Response, APIRouter
from sqlalchemy.orm.session import Session
from enum import Enum
import db.dataset as dataset
from fastapi.middleware.cors import CORSMiddleware
from db.database import Base, engines, engine
from fastapi import HTTPException,status ## status code 관련
from pydantic import BaseModel #post 요청시 모델설계
from fastapi.responses import StreamingResponse
from router import dataset_router, characteristic_router

app = FastAPI(
        title="ppark_project",
        version="0.1",
        docs_url="/api2/docs",
        openapi_url="/api2/openapi.json",
    )

#라우터 추가
app.include_router(dataset_router.router) #라우팅 추가
app.include_router(characteristic_router.router) #라우팅 추가


#기존 db연결
Base.metadata.bind = engines

# DB 생성

# Base.metadata.create_all(bind=engine)
# predefined values
some_file_path = "file_example_MP4_1920_18MG.mp4"
# path parameter 제한 타입 설정
class BlogType(str, Enum):
    true = '12' # 뒤에 값들이 실제 파라미터 값으로 간다
    story = '2'
    howto = '3'

class Item(BaseModel):
    name: str
    description: Union[str, None] = None
    price: float
    tax: Union[float, None] = None


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/hello/{id}")
def hello(id):
    return {id}
# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = "nice"):
#     return {"item_id": item_id, "q": q}
@app.get("/items/{item_id}",  status_code = status.HTTP_200_OK)
def read_item(item_id: int, q: Optional[int] = None, response : Response = None): #query parameter에는 int타입이 와야 하며, q를 입력 안해도 된다
    if item_id > 5:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {'error' : f'blog {item_id} is not found'}
    return {"item_id": item_id, "q": q, "response": response}

#순서가 바뀌면 안됨!
@app.get("/blog/all")
def get_blog_id(id):
    return "allblog"

@app.get("/blog/{id}")
def get_blog_id(id):
    return {"id": id}
@app.get("/blog/{id}/comment/{comment_id}", tags= ['blog', 'comment'])
def get_blog_comment(id, comment_id):
    return {"id": id, "comment_id": comment_id}
#path parameter 제한
@app.get('/blog/type/{item}')
def get_blog_type(item:BlogType):
    return {'message': f'blog type is {item.value}, {item.name}'}
@app.get("/video")
def main():
    def iterfile():  # 
        with open(some_file_path, mode="rb") as file_like:  # 
            yield from file_like  # 

    return StreamingResponse(iterfile(), media_type="video/mp4")

## Post 요청
@app.post("/items/")
async def create_item(item: Item):
    return item

## cors
# origins = [
#     'http://localhost:3006'
# ] ## allow specific origins 
origins = ['*'] ##allow all origins

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    # 모든 요청 다 허가한다
    allow_methods = ["*"],
    allow_headers = ['*']

)