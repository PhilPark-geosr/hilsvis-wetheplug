# coding: utf-8
from sqlalchemy import ARRAY, Boolean, CheckConstraint, Column, DateTime, Float, ForeignKey, Integer, Numeric, String, Table, Text, text
from geoalchemy2.types import Geometry, Raster
from sqlalchemy.dialects.postgresql import INTERVAL
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Category(Base):
    __tablename__ = 'categories'
    __bind_key__ = 'hils'
    category_id = Column(Integer, primary_key=True, server_default=text("nextval('categories_category_id_seq'::regclass)"))
    category_name = Column(String(10), nullable=False, unique=True)


t_geography_columns = Table(
    'geography_columns', metadata,
    Column('f_table_catalog', String),
    Column('f_table_schema', String),
    Column('f_table_name', String),
    Column('f_geography_column', String),
    Column('coord_dimension', Integer),
    Column('srid', Integer),
    Column('type', Text)
)


t_geometry_columns = Table(
    'geometry_columns', metadata,
    Column('f_table_catalog', String(256)),
    Column('f_table_schema', String),
    Column('f_table_name', String),
    Column('f_geometry_column', String),
    Column('coord_dimension', Integer),
    Column('srid', Integer),
    Column('type', String(30))
)


t_raster_columns = Table(
    'raster_columns', metadata,
    Column('r_table_catalog', String),
    Column('r_table_schema', String),
    Column('r_table_name', String),
    Column('r_raster_column', String),
    Column('srid', Integer),
    Column('scale_x', Float(53)),
    Column('scale_y', Float(53)),
    Column('blocksize_x', Integer),
    Column('blocksize_y', Integer),
    Column('same_alignment', Boolean),
    Column('regular_blocking', Boolean),
    Column('num_bands', Integer),
    Column('pixel_types', ARRAY(Text())),
    Column('nodata_values', ARRAY(Float(precision=53))),
    Column('out_db', ARRAY(Boolean())),
    Column('extent', Geometry(spatial_index=False, from_text='ST_GeomFromEWKT', name='geometry')),
    Column('spatial_index', Boolean)
)


t_raster_overviews = Table(
    'raster_overviews', metadata,
    Column('o_table_catalog', String),
    Column('o_table_schema', String),
    Column('o_table_name', String),
    Column('o_raster_column', String),
    Column('r_table_catalog', String),
    Column('r_table_schema', String),
    Column('r_table_name', String),
    Column('r_raster_column', String),
    Column('overview_factor', Integer)
)


class SpatialRefSy(Base):
    __tablename__ = 'spatial_ref_sys'
    __table_args__ = (
        CheckConstraint('(srid > 0) AND (srid <= 998999)'),
    )
    __bind_key__ = 'hils'

    srid = Column(Integer, primary_key=True)
    auth_name = Column(String(256))
    auth_srid = Column(Integer)
    srtext = Column(String(2048))
    proj4text = Column(String(2048))


class Type(Base):
    __tablename__ = 'types'
    __bind_key__ = 'hils'
    type_id = Column(Integer, primary_key=True, server_default=text("nextval('types_type_id_seq'::regclass)"))
    type_name = Column(String(10), nullable=False, unique=True)


class Typoon(Base):
    __tablename__ = 'typoons'
    __bind_key__ = 'hils'
    typoon_id = Column(Integer, primary_key=True, server_default=text("nextval('typoons_typoon_id_seq'::regclass)"))
    typoon_name = Column(String(20), nullable=False)
    time_start = Column(DateTime, nullable=False)
    time_end = Column(DateTime, nullable=False)


class Dataset(Base):
    __tablename__ = 'datasets'
    __bind_key__ = 'hils'
    dataset_id = Column(Integer, primary_key=True, server_default=text("nextval('datasets_dataset_id_seq'::regclass)"))
    type_id = Column(ForeignKey('types.type_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    category_id = Column(ForeignKey('categories.category_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    dataset_name = Column(String(40), nullable=False, unique=True)
    lon_start = Column(Numeric(7, 4), nullable=False)
    lon_end = Column(Numeric(7, 4), nullable=False)
    lon_step = Column(Numeric(5, 4), nullable=False)
    lon_num = Column(Integer, nullable=False)
    lat_start = Column(Numeric(6, 4), nullable=False)
    lat_end = Column(Numeric(6, 4), nullable=False)
    lat_step = Column(Numeric(5, 4), nullable=False)
    lat_num = Column(Integer, nullable=False)
    time_start = Column(DateTime, nullable=False)
    time_end = Column(DateTime, nullable=False)
    time_step = Column(INTERVAL, nullable=False)
    time_num = Column(Integer, nullable=False)

    category = relationship('Category')
    type = relationship('Type')


class Path(Base):
    __tablename__ = 'paths'
    __bind_key__ = 'hils'
    path_id = Column(Integer, primary_key=True, server_default=text("nextval('paths_path_id_seq'::regclass)"))
    typoon_id = Column(ForeignKey('typoons.typoon_id'), nullable=False)
    datetime = Column(DateTime, nullable=False)
    lat = Column(Numeric(3, 1), nullable=False)
    lon = Column(Numeric(4, 1), nullable=False)
    kma_pres = Column(Integer)
    kma_wind = Column(Integer)
    kma_r15 = Column(Integer)
    kma_grade = Column(String(15))

    typoon = relationship('Typoon')


class Variable(Base):
    __tablename__ = 'variables'
    __bind_key__ = 'hils'
    var_id = Column(Integer, primary_key=True, server_default=text("nextval('variables_var_id_seq'::regclass)"))
    dataset_id = Column(ForeignKey('datasets.dataset_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    var_name = Column(String(20), nullable=False)
    var_long_name = Column(String(40))
    var_standard_name = Column(String(40))
    var_units = Column(String(20))

    dataset = relationship('Dataset')


class Data(Base):
    __tablename__ = 'datas'
    __bind_key__ = 'hils'
    data_id = Column(Integer, primary_key=True, server_default=text("nextval('datas_data_id_seq'::regclass)"))
    dataset_id = Column(ForeignKey('datasets.dataset_id'), nullable=False)
    var_id = Column(ForeignKey('variables.var_id'), nullable=False)
    time_id = Column(Integer, nullable=False)
    rast = Column(Raster(from_text='raster', name='raster'), nullable=False, index=True)

    dataset = relationship('Dataset')
    var = relationship('Variable')
