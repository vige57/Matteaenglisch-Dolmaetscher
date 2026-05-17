# Matteänglisch-Dolmetscher (PWA)

Ein interaktiver Übersetzer für Matteänglisch (Berner Geheimsprache), optimiert als Progressive Web App (PWA).

## 🚀 Funktionen

- **Echtzeit-Übersetzung**: Übersetzt Texte sofort in Matteänglisch.
- **Lernmodus**: Interaktive Visualisierung der Wortbildung (Konsonanten-Vokal-Trennung).
- **Vorlesefunktion**: Integrierte Sprachausgabe für die übersetzten Begriffe.
- **PWA-Unterstützung**: Kann als App auf dem Smartphone oder Desktop installiert werden.
- **Offline-Modus**: Funktioniert dank Service Worker auch ohne aktive Internetverbindung.

## 📂 Projektstruktur

- `index.html`: Die Hauptdatei für das Web-Hosting (Kopie der aktuellsten Version). GitHub Pages nutzt diese Datei als Einstiegspunkt.
- `Matteänglisch-Dolmätscher_v1_5_3.html`: Die versionierte Originaldatei der Anwendung.
- `manifest.json`: Konfiguration für die App-Installation.
- `sw.js`: Service Worker für das Offline-Caching.
- `icon-192.png` & `icon-512.png`: App-Icons.

## 🛠 Installation & Hosting

### GitHub Pages (Empfohlen)
Da GitHub Pages automatisch HTTPS unterstützt, ist es ideal für diese PWA. Die Datei `index.html` dient dabei als technischer Einstiegspunkt (Kopie von `Matteänglisch-Dolmätscher_v1_5_3.html`).

1. Laden Sie Ihren Code in ein GitHub-Repository hoch.
2. Gehen Sie zu den **Settings** (Einstellungen) Ihres Repositories.
3. Wählen Sie im linken Menü **Pages** aus.
4. Wählen Sie unter "Build and deployment" den Branch `main` (oder `master`) und den Ordner `/ (root)`.
5. Klicken Sie auf **Save**. Nach wenigen Minuten ist die App unter `https://<ihr-benutzername>.github.io/<repo-name>/` erreichbar.

### Manueller Web-Server
Um die PWA-Funktionen (Installation und Offline-Modus) zu nutzen, muss die Anwendung über **HTTPS** bereitgestellt werden:

1. Laden Sie alle Dateien in ein Verzeichnis auf Ihrem Webserver hoch.
2. Stellen Sie sicher, dass die Seite über eine verschlüsselte Verbindung (https://...) erreichbar ist.

### Lokale Nutzung
Sie können die `.html` Datei auch einfach lokal in einem Browser öffnen. In diesem Fall funktionieren jedoch die Service Worker und die Installation als App (PWA) meist nicht.

## 📱 Als App installieren

### Android (Chrome)
- Öffnen Sie die Website in Chrome.
- Tippen Sie auf das Drei-Punkte-Menü.
- Wählen Sie **"App installieren"** oder **"Zum Startbildschirm hinzufügen"**.

### iOS / iPhone (Safari)
- Öffnen Sie die Website in Safari.
- Tippen Sie auf das **Teilen-Symbol** (Viereck mit Pfeil nach oben).
- Scrollen Sie nach unten und wählen Sie **"Zum Home-Bildschirm"**.

---
*Erstellt für die Matteänglisch-Community.*