# coding: utf-8
from sqlalchemy import BigInteger, Column
from geoalchemy2.types import Geometry
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class KcgNonshipAccident(Base):
    __tablename__ = 'kcg_nonship_accidents'
    __table_args__ = {'schema': 'characteristics_accidents'}
    __bind_key__ = 'hils2'
    kcg_nonship_accidents_id = Column(BigInteger, primary_key=True, index=True)
    geometry = Column(Geometry('POINT', 4179, from_text='ST_GeomFromEWKT', name='geometry'), index=True)


class KcgShipAccident(Base):
    __tablename__ = 'kcg_ship_accidents'
    __table_args__ = {'schema': 'characteristics_accidents'}
    __bind_key__ = 'hils2'
    kcg_ship_accidents_id = Column(BigInteger, primary_key=True, index=True)
    geometry = Column(Geometry('POINT', 4179, from_text='ST_GeomFromEWKT', name='geometry'), index=True)


class KmstShipAccident(Base):
    __tablename__ = 'kmst_ship_accidents'
    __table_args__ = {'schema': 'characteristics_accidents'}
    __bind_key__ = 'hils2'
    kmst_ship_accidents_id = Column(BigInteger, primary_key=True, index=True)
    geometry = Column(Geometry('POINT', 4179, from_text='ST_GeomFromEWKT', name='geometry'), index=True)
