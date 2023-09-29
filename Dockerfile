# Verwenden Sie das offizielle Node.js-Basisimage
FROM node:18

# Arbeitsverzeichnis im Container festlegen
WORKDIR /app

# Kopieren Sie die Abhängigkeiten und den Anwendungscode in das Arbeitsverzeichnis
COPY package*.json ./
COPY . .

# Installieren Sie die Abhängigkeiten
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]
#RUN docker run -p 8080:3000 -it programmierprojekt2023:1 bash
#RUN npm run dev

# Exponieren Sie den Port, auf dem die Anwendung in Ihrem #Container läuft (normalerweise 3000)
EXPOSE 8080

# Bauen Sie die Next.js-Anwendung
#RUN npm build

# Starten Sie die Anwendung
