FROM mongo:latest

WORKDIR /docker-entrypoint-initdb.d

RUN apt update && apt install  vim -y

COPY courses_data.json /docker-entrypoint-initdb.d/

COPY script.sh /docker-entrypoint-initdb.d/

RUN chmod +x script.sh

CMD ["bash", "/docker-entrypoint-initdb.d/script.sh"]
