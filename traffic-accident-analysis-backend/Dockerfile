### PHASE 1 ###

FROM maven:3.9.9-amazoncorretto-21-alpine AS builder

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src/ ./src/

RUN mvn clean package -DskipTests=true

### PHASE 2 ###

FROM amazoncorretto:21

WORKDIR /app

COPY --from=builder /app/target/*.jar /app/traffic-accident-analysis-backend.jar

ENV SERVER_PORT=8080

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "traffic-accident-analysis-backend.jar"]

