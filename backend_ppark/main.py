from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.database import Base, engines
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