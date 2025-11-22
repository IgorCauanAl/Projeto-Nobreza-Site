
FROM maven:3.9.9-amazoncorretto-21 AS build

WORKDIR /app


COPY pom.xml .

COPY src /app/src


RUN mvn clean package -DskipTests


FROM eclipse-temurin:17-jre



EXPOSE 8081


ARG APP_JAR=target/nobreza-loja-0.0.1-SNAPSHOT.jar


COPY --from=build ${APP_JAR} app.jar

ENTRYPOINT ["java", "-Xmx512m", "-jar", "/app.jar"]
