# coding: utf-8
from sqlalchemy import BigInteger, Column
from geoalchemy2.types import Geometry
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata

class AidsToNavigationArea(Base):
    __tablename__ = 'aids_to_navigation_areas'
    __table_args__ = {'schema': 'characteristics_zones'}
    __bind_key__ = 'hils2'
    aids_to_navigation_areas_id = Column(BigInteger, primary_key=True, index=True)
    geometry = Column(Geometry('MULTIPOLYGON', 4179, from_text='ST_GeomFromEWKT', name='geometry'), index=True)

class ForecastCoastalArea(Base):
    __tablename__ = 'forecast_coastal_areas'
    __table_args__ = {'schema': 'characteristics_zones'}
    __bind_key__ = 'hils2'
    forecast_coastal_areas_id = Column(BigInteger, primary_key=True, index=True)
    geometry = Column(Geometry('POLYGON', 4179, from_text='ST_GeomFromEWKT', name='geometry'), index=True)


class ForecastRegionalArea(Base):
    __tablename__ = 'forecast_regional_areas'
    __table_args__ = {'schema': 'characteristics_zones'}
    __bind_key__ = 'hils2'
    forecast_regional_areas_id = Column(BigInteger, primary_key=True, index=True)
    geometry = Column(Geometry(srid=4179, from_text='ST_GeomFromEWKT', name='geometry'), index=True)


class TrafficSaftetyDesignatedArea(Base):
    __tablename__ = 'traffic_saftety_designated_areas'
    __table_args__ = {'schema': 'characteristics_zones'}
    __bind_key__ = 'hils2'
    traffic_saftety_designated_areas_id = Column(BigInteger, primary_key=True, index=True)
    geometry = Column(Geometry(srid=4179, from_text='ST_GeomFromEWKT', name='geometry'), index=True)


class TssBoundary(Base):
    __tablename__ = 'tss_boundaries'
    __table_args__ = {'schema': 'characteristics_zones'}
    __bind_key__ = 'hils2'
    tss_boundaries_id = Column(BigInteger, primary_key=True, index=True)
    geometry = Column(Geometry('LINESTRING', 4179, from_text='ST_GeomFromEWKT', name='geometry'), index=True)


class TssZone(Base):
    __tablename__ = 'tss_zones'
    __table_args__ = {'schema': 'characteristics_zones'}
    __bind_key__ = 'hils2'
    tss_zones_id = Column(BigInteger, primary_key=True, index=True)
    geometry = Column(Geometry('POLYGON', 4179, from_text='ST_GeomFromEWKT', name='geometry'), index=True)
