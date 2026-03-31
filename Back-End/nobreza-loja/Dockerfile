FROM openjdk:21-jdk-slim

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app


COPY pom.xml .

# Copia o diretório .mvn e os scripts mvnw
COPY .mvn .mvn
COPY mvnw .



RUN chmod +x mvnw

# Baixa as dependências do Maven
RUN ./mvnw dependency:go-offline -B

# Copia o código fonte da aplicação
COPY src src

# Compila a aplicação Spring Boot
RUN ./mvnw package -DskipTests

EXPOSE 8080

# Define o comando para executar a aplicação
ENTRYPOINT ["java", "-jar", "target/*.jar"]