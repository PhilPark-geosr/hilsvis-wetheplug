from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from starlette.config import Config
from starlette.datastructures import Secret

Base = declarative_base()


from sqlalchemy.orm import Session, sessionmaker, scoped_session
from sqlalchemy import select, create_engine

config = Config(".env")

db_user = config("PG_USER", cast=str)
db_password = config("PG_PASSWORD", cast=Secret)
db_host = config("PG_HOST", cast=str)
# db_host = 'localhost'
db_port = config("PG_PORT", cast=str, default="5432")
db_database1 = config("PG_DB1", cast=str)
db_database2 = config("PG_DB2", cast=str)

DATABASE_URL1 = f"postgresql+psycopg2://{db_user}:{db_password}@{db_host}:{db_port}/{db_database1}"
DATABASE_URL2= f"postgresql+psycopg2://{db_user}:{db_password}@{db_host}:{db_port}/{db_database2}"
print(DATABASE_URL2)
engines = {
    "hils": create_engine(
        DATABASE_URL1,
        echo = True ## sql문 출력
    ),
    "hils2": create_engine(
        DATABASE_URL2,
        echo = True
    ),
    
}
engine = create_engine(DATABASE_URL2,echo = True)


class RoutingSession(Session):
    def get_bind(self, mapper=None, clause=None, **kw):
        bind_key = mapper.class_.__bind_key__
        return engines[bind_key]

session = scoped_session(sessionmaker(class_=RoutingSession))

# DB connection Dependency
def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()