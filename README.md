# Matteänglisch-Dolmetscher (PWA)

Ein interaktiver Übersetzer für Matteänglisch (Berner Geheimsprache), optimiert als Progressive Web App (PWA).

---

## 📂 Die neue Projektstruktur (Wichtig für Entwickler & KI)

Um das Projekt übersichtlich zu halten und die Zusammenarbeit mit KI-Assistenten (wie Claude) zu optimieren, ist das Repository strikt in verschiedene Bereiche unterteilt:

```text
/
├── .ai_prompts/       # 🤖 KI-Tresor: Hier liegen alle Prompts (.promptasset). 
│                      # Dieser Ordner wird von KIs im Code-Editor ignoriert, um Tokens zu sparen.
├── .github/workflows/ # ⚙️ Pipelines: Automatisches Deployment und Versionierung.
├── src/               # 🚀 HIER LEBT DIE APP: Der einzige Ordner für den eigentlichen Code!
│   ├── index.html     # -> Die Haupt-Arbeitsdatei (Bitte nur noch diese bearbeiten!)
│   ├── sw.js          # -> Service Worker (steuert Offline-Modus & Version)
│   ├── manifest.json  # -> App-Metadaten
│   └── icon-*.png     # -> App-Logos
├── .*ignore           # 🛡️ Diverse Ignore-Dateien (Git, Copilot, Cursor etc.)
└── README.md          # 📖 Diese Dokumentation
```

---

## 👨‍💻 Workflow für die Entwicklung (mit Claude & Co.)

Wir nutzen keine manuell versionierten Dateien (`Mattenenglisch_v1_x_x.html`) mehr. 

**So arbeitest du an neuen Features:**
1. Lade **ausschließlich** die Datei `src/index.html` in deinen KI-Chat hoch.
2. Lass die KI die Anpassungen vornehmen.
3. Speichere die Änderungen wieder in exakt derselben Datei (`src/index.html`) ab.
4. Fertig! Sobald du die Datei auf GitHub pushst, übernimmt das System den Rest.

---

## 🚀 Release- & Deployment-Automatisierung

Dieses Projekt arbeitet mit vollautomatisierten GitHub Actions. Sobald eine Änderung am Code im Ordner `src/` auf den `main`-Branch gepusht wird, passieren zwei Dinge:

### 1. Auto Version Bump
Das System liest die alte Version aus der `src/sw.js` aus, erhöht die Patch-Version (z. B. `1.7.8` → `1.7.9`) und schreibt diese neue Version automatisch in die `sw.js` und `manifest.json`.

### 2. Auto Deployment (GitHub Pages)
Anschließend greift sich GitHub Pages **nur** den Ordner `src/` und veröffentlicht ihn als Live-Website. Dadurch sind deine Prompts und Infrastruktur-Dateien niemals öffentlich im Web sichtbar.

> **Wichtig:** Eine Änderung, die *außerhalb* des `src/`-Ordners passiert (z. B. wenn du einen neuen Prompt im `.ai_prompts`-Ordner anlegst), löst diese Aktionen **nicht** aus. Die Live-Website und die Versionsnummer bleiben in diesem Fall unberührt.

---

## 📱 App Installation (PWA-Nutzung)

Diese Web-App lässt sich wie eine echte, native App auf Endgeräten installieren und funktioniert dank des Service Workers (`sw.js`) auch offline.

* **Android (Chrome)**: Öffne die Website → tippe auf das Drei-Punkte-Menü → wähle **"App installieren"** oder **"Zum Startbildschirm hinzufügen"**.
* **iOS / iPhone (Safari)**: Öffne die Website → tippe auf das **Teilen-Symbol** (Viereck mit Pfeil nach oben) → wähle **"Zum Home-Bildschirm"**.

### Updates beim Nutzer
Wenn im Hintergrund durch GitHub eine neue Version veröffentlicht wurde, lädt die App auf dem Handy das Update beim nächsten Start automatisch herunter. Im Footer der App ist stets die aktuell geladene Version ersichtlich.

---
*Erstellt für die Matteänglisch-Community.*