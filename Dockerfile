FROM python:3.9.6-slim-buster
RUN pip install pipenv
COPY . ./
RUN pipenv install
CMD ["pipenv", "run", "start"]