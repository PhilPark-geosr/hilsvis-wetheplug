# pull the official docker image
FROM python:3.10-slim-buster

# set a working directory
WORKDIR /backend
ENV PYTHONPATH=${PYTHONPATH}:${PWD} 

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

# copy the requirements file
# COPY ./requirements.txt /backend/requirements.txt
COPY ./pyproject.toml /backend/pyproject.toml
RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev --no-root
# upgrade pip

# copy all the code in the build context
COPY . /backend