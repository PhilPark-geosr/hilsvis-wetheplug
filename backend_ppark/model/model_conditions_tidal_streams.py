# coding: utf-8
from sqlalchemy import BigInteger, Column, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class RefTidalStation(Base):
    __tablename__ = 'ref_tidal_stations'
    __table_args__ = {'schema': 'conditions_tidal_streams'}
    __bind_key__ = 'hils2'
    number = Column(Text, primary_key=True, index=True)
    station_name = Column(Text)

    current = relationship('TideCurrent', back_populates = 'ref_tidal_station')

class TideCurrent(Base):
    __tablename__ = 'tide_current'
    __table_args__ = {'schema': 'conditions_tidal_streams'}
    __bind_key__ = 'hils2'
    tide_current_id = Column(BigInteger, primary_key=True, index=True)
    number = Column(ForeignKey('conditions_tidal_streams.ref_tidal_stations.number'))
    objnamobjectname = Column(Text)
    orientorientation = Column(Float(53))
    cat_tscategoryoftidalstream = Column(BigInteger)
    curvelcurrentvelocity_m_s_ = Column('curvelcurrentvelocity(m/s)', Float(53))
    dataexist = Column(Text)
    latitude_degree = Column(Float(53))
    longitude_degree = Column(Float(53))
    usingtidalstation = Column(Text)
    usage = Column(Text)

    ref_tidal_station = relationship('RefTidalStation', back_populates = 'current')
