
FROM maven:3.9.9-amazoncorretto-21 AS build

WORKDIR /app


COPY pom.xml .

COPY src /app/src


RUN mvn clean package -DskipTests


FROM openjdk:21-jre-bullseye


EXPOSE 8081


ARG APP_JAR=target/SiteNobrezaLojaDeTernosMasculinaApplication-SNAPSHOT.jar


COPY --from=build ${APP_JAR} app.jar

ENTRYPOINT ["java", "-Xmx512m", "-jar", "/app.jar"]
