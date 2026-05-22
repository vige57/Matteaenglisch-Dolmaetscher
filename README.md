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

---

## 🛠 Release- & Versionsmanagement

Dieses Projekt nutzt einen automatisierten Release-Prozess. Die **Versionsnummer wird zentral gesteuert** und automatisch bei jedem Update erhöht.

### 1. Die "Source of Truth"
Die primäre Quelle für die Versionsnummer ist die Datei `sw.js`.
- Die Variable `const DEFAULT_VERSION` im Service Worker definiert den aktuellen Stand der App.
- Der Footer in der App bezieht seine Informationen direkt vom aktiven Service Worker per Messaging (`GET_VERSION`), nicht aus dem statischen HTML.

### 2. Automatisierter Update-Workflow (GitHub Actions)
Sobald Änderungen in den `main`-Branch gemergt werden (z. B. durch einen Pull Request), startet der Workflow **"Auto Version Bump"**:

1. **Extraktion:** Er liest die aktuelle Version aus der `sw.js`.
2. **Inkrement:** Er erhöht die Patch-Version (z. B. `1.7.10` → `1.7.11`).
3. **Synchronisation:** Er schreibt die neue Version zurück in die `sw.js` **und** in die `manifest.json`.
4. **Commit:** Er erstellt einen automatischen Commit mit dem Tag `[skip ci]`, um Endlosschleifen zu verhindern.

### 3. Client-seitiges Update-Verhalten
Durch die physische Änderung in der `sw.js` erkennt der Browser des Nutzers sofort, dass eine neue Version vorliegt:

- **Hintergrund-Installation:** Der neue Service Worker wird im Hintergrund installiert.
- **Update-Banner:** Sobald der neue Worker bereitsteht, erscheint in der App ein Banner ("Neue Version verfügbar").
- **Aktivierung:** Beim Klick auf "Jetzt neu laden" übernimmt der neue Worker die Kontrolle, löscht den alten Cache und aktualisiert die Anzeige im Footer sofort per Live-Event (`SW_ACTIVATED`).

---

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


