# Use a minimal JRE image as the base image
FROM openjdk:17-slim AS builder

# Set the working directory inside the container
WORKDIR /app

# Install necessary packages (remove any that are not needed)
RUN apt-get update && \
    apt-get install -y \
        wget apt-transport-https gnupg lsb-release && \
    rm -rf /var/lib/apt/lists/*

# Optional: If you need Trivy for security scanning
RUN wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | apt-key add - && \
    echo "deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | tee -a /etc/apt/sources.list.d/trivy.list && \
    apt-get update && \
    apt-get install -y trivy && \
    rm -rf /var/lib/apt/lists/*

# Copy the already generated JAR file into the container
COPY target/eims_v2.jar .

# Set JVM memory options (uncomment if needed)
# ENV JAVA_OPTS="-Xmx200m -Xms200m"

# Specify the command to run your application
CMD ["java", "-jar", "eims_v2.jar"]
