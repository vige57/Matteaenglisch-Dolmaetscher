# Matteänglisch-Dolmetscher (PWA)

Ein interaktiver Übersetzer für Matteänglisch (Berner Geheimsprache), optimiert als Progressive Web App (PWA).

## 📖 Kurzanleitung (Zusammenfassung)

Diese App ist als **Progressive Web App (PWA)** konzipiert. Hier ist das Wichtigste für die Nutzung:

1.  **Hosting**: Die Dateien müssen auf einem Webserver mit **HTTPS** liegen (z. B. GitHub Pages).
2.  **Installation**:
    *   **Android/Chrome**: Drei-Punkte-Menü → "App installieren".
    *   **iOS/Safari**: Teilen-Symbol → "Zum Home-Bildschirm".
3.  **Offline-Modus**: Einmal geladen, funktioniert die App auch ohne Internetverbindung.
4.  **Updates**: Änderungen am Code werden aktiv, wenn in der `sw.js` der `CACHE_NAME` aktualisiert wird.

## 🚀 Funktionen

- **Echtzeit-Übersetzung**: Übersetzt Texte sofort in Matteänglisch.
- **Lernmodus**: Interaktive Visualisierung der Wortbildung (Konsonanten-Vokal-Trennung).
- **Vorlesefunktion**: Integrierte Sprachausgabe für die übersetzten Begriffe.
- **PWA-Unterstützung**: Kann als App auf dem Smartphone oder Desktop installiert werden.
- **Offline-Modus**: Funktioniert dank Service Worker auch ohne aktive Internetverbindung.

## 📂 Projektstruktur

- `index.html`: Die Hauptdatei für das Web-Hosting (Kopie der aktuellsten Version). GitHub Pages nutzt diese Datei als Einstiegspunkt.
- `Mattenenglisch-Dolmetscher_v1_7_5.html`: Die versionierte Originaldatei der Anwendung.
- `Matteänglisch-Dolmätscher_v1_5_3.html`: Ältere Version der Anwendung.
- `manifest.json`: Konfiguration für die App-Installation.
- `sw.js`: Service Worker für das Offline-Caching.
- `icon-192.png` & `icon-512.png`: App-Icons.

## 🛠 Installation & Hosting

### GitHub Pages (Empfohlen)
Da GitHub Pages automatisch HTTPS unterstützt, ist es ideal für diese PWA. Die Datei `index.html` dient dabei als technischer Einstiegspunkt (Kopie von `Mattenenglisch-Dolmetscher_v1_7_5.html`).

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

## Cache & Update‑Handhabung

Dieses Projekt nutzt einen Service Worker (`sw.js`) zur Offline‑Fähigkeit. Kurz zusammengefasst:

- **Versionierung:** Die SW liest die App‑Version aus dem Feld `version` in `manifest.json`. Erhöhe diese Version (z. B. `1.7.5` → `1.7.6`) bei einem Release, damit der neue Service Worker eine neue Cache‑Bezeichnung verwendet.
- **Was passiert bei einem Version‑Bump:** Beim nächsten Laden installiert der Browser den neuen SW, `skipWaiting()` sorgt für schnellen Wechsel; beim `activate` werden alte Caches gelöscht.
- **Offline‑Fallback:** Eine einfache `offline.html` wird precached; wenn eine Navigation fehlschlägt (offline), liefert der SW diese Seite.
- **Manuelles Leeren (Entwickler):** DevTools → Application → Service Workers → `Unregister` und unter `Clear storage` die Caches löschen.

Testing (lokal):

1. Starte einen lokalen HTTP‑Server im Projektverzeichnis (SW funktioniert auf `localhost` ohne HTTPS):

```bash
npx http-server . -p 8080
```

2. Öffne `http://localhost:8080` in Chrome. DevTools → Application → Service Workers prüfen.
3. Update‑Flow testen: Erhöhe `manifest.json:version`, lade die Seite neu — es sollte ein Update‑Banner erscheinen; wähle "Jetzt neu laden", der neue SW wird aktiv und die Seite aktualisiert.
4. Offline testen: Seite laden, dann DevTools → Network → Offline, navigiere → `offline.html` wird gezeigt.

Release‑Hinweis:

- Dokumentiere den `manifest.json`‑Version‑Bump in `CHANGELOG.md` bzw. Release‑Notes, damit Deployments und Cache‑Bumps nachvollziehbar sind.
- Optional: Eine CI‑Action kann prüfen, ob `manifest.json` und `sw.js` Versionen zusammenpassen.


# Vorgehen für neues Feature

1. neuer Banch erstellen (create Branch)
2. Änderungen machen 
3. Änderungen stagen
4. commit erstellenm
5. Auf github Pull/Merge Request erstellen
6. Pull annehmen wenn gut.
