# coding: utf-8
from sqlalchemy import BigInteger, Column
from geoalchemy2.types import Geometry
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class AllRoute(Base):
    __tablename__ = 'all_routes'
    __table_args__ = {'schema': 'characteristics_routes'}
    __bind_key__ = 'hils2'
    all_routes_id = Column(BigInteger, primary_key=True, index=True)
    geometry = Column(Geometry('POINT', 4179, from_text='ST_GeomFromEWKT', name='geometry'), index=True)


class DesignatedRoute(Base):
    __tablename__ = 'designated_routes'
    __table_args__ = {'schema': 'characteristics_routes'}
    __bind_key__ = 'hils2'
    designated_routes_id = Column(BigInteger, primary_key=True, index=True)
    geometry = Column(Geometry(srid=4179, from_text='ST_GeomFromEWKT', name='geometry'), index=True)


class PassengerShipRoute(Base):
    __tablename__ = 'passenger_ship_routes'
    __table_args__ = {'schema': 'characteristics_routes'}
    __bind_key__ = 'hils2'
    passenger_ship_routes_id = Column(BigInteger, primary_key=True, index=True)
    geometry = Column(Geometry('LINESTRING', 4179, from_text='ST_GeomFromEWKT', name='geometry'), index=True)


class TwowayRoutePart(Base):
    __tablename__ = 'twoway_route_parts'
    __table_args__ = {'schema': 'characteristics_routes'}
    __bind_key__ = 'hils2'
    twoway_route_parts_id = Column(BigInteger, primary_key=True, index=True)
    geometry = Column(Geometry('POLYGON', 4179, from_text='ST_GeomFromEWKT', name='geometry'), index=True)


class YachtRoute(Base):
    __tablename__ = 'yacht_routes'
    __table_args__ = {'schema': 'characteristics_routes'}
    __bind_key__ = 'hils2'
    yacht_routes_id = Column(BigInteger, primary_key=True, index=True)
    geometry = Column(Geometry('LINESTRING', 4179, from_text='ST_GeomFromEWKT', name='geometry'), index=True)
