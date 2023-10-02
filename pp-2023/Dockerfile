# Verwenden des offiziellen Node.js-Basisimage
FROM node:18

# Arbeitsverzeichnis im Container festlegen
WORKDIR /app

# Kopieren der Abhängigkeiten und des Anwendungscodes in das Arbeitsverzeichnis
COPY package*.json ./
COPY . .

# Installieren 
RUN npm install

# Installieren der xlsx Bibliothek
RUN npm i xlsx

# Bauen der Next.js-Anwendung
RUN npm run build

# Starten der Anwendung
CMD ["npm", "run", "start"]

# Exponieren des Ports, auf dem die Anwendung in dem Container läuft
EXPOSE 8080
