# Unreal Union Frontend

## Übersicht
Dieses Dokument beschreibt den Prozess zum Deployment des Unreal Union Frontend-Projekts mittels Docker. Es wird davon ausgegangen, dass Docker auf dem System installiert und betriebsbereit ist.

## Voraussetzungen
Bevor Sie beginnen, stellen Sie sicher, dass folgende Voraussetzungen erfüllt sind:
- Docker ist auf Ihrem System installiert.
- Sie haben Zugriff auf das Projektverzeichnis von Unreal Union Frontend.

## Deployment-Prozess

### Schritt 1: Vorbereiten des Projektverzeichnisses
Navigieren Sie in das Projektverzeichnis:
```bash
cd [Project Folder]

Schritt 2: Erstellen der .env-Datei

Erstellen Sie eine .env-Datei im Root-Verzeichnis des Projekts und definieren Sie die erforderlichen Umgebungsvariablen.

VITE_APP_ROOT_API=http://127.0.0.1/api/unreal-union/v1

Schritt 3: Erstellen des Docker-Images

Bauen Sie das Docker-Image des Projekts:

docker build . -t my-app

Schritt 4: Ausführen des Containers

Starten Sie einen Docker-Container basierend auf dem erstellten Image:

docker run -d -p 8080:80 my-app

Zugriff

Nachdem der Container gestartet wurde, ist die Anwendung über http://localhost:8080 in Ihrem Webbrowser erreichbar.