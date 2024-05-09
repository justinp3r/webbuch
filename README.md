<h1> Für den erfolgreichen Start </h1>

Zu Beginn sollten die Abhängigkeiten installiert werden:

```shellscript
npm install
```

<h1> Deployment </h1>
 Dev Server starten:
 
```shellscript
npm run dev
```

App im Produktionsmodus bauen:

```sh
npm run build
```

App im Produktionsmodus starten:

```sh
npm start
```

<h1>Semesterprojekt Webbuch</h1>
Für die 2. Abgabe des 4. Semesters präsentieren wir hier ein in Gruppenarbeit erstelltes Projekt.
Dieses Projekt demonstriert eine vollständige Client-Server-Architektur für die Verwaltung von Büchern und besteht aus drei Hauptkomponenten:
1. PostgreSQL-Datenbank
Die Buchdaten werden in einer PostgreSQL-Datenbank gespeichert, die in einem Docker-Container läuft.
2. App-Server
Der App-Server stellt eine API für den Zugriff auf die Buchdaten bereit. Er ist in Node.js implementiert und kommuniziert mit der PostgreSQL-Datenbank, um Bücher abzurufen, zu erstellen, zu aktualisieren und zu löschen. Die API folgt den REST-Prinzipien.
3. Web-Client
Der Web-Client ist eine React-Applikation, die mit Remix und Material-UI erstellt wurde. Er bietet eine benutzerfreundliche Oberfläche für die Verwaltung von Büchern. Admins können Bücher anzeigen, hinzufügen, bearbeiten und löschen.

<h1>Sonstiges</h1>
Software Engineering, 4. Semester.

Eine Kollaboration zwischen Maxim Weidler, Justin Perrone, Roman Sommer und Tim Spode.
