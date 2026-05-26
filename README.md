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

Wir nutzen keine manuell versionierten Dateien (`Mattenenglisch_v1_x_x.html`) mehr. Zudem ist der Haupt-Branch (`main`) geschützt – direkte Änderungen daran sind blockiert, um die Qualität zu sichern.

**So arbeitest du sauber an neuen Features:**

### 1. Branch erstellen
Erstelle einen neuen, separaten Feature-Branch und wechsle dorthin. Wähle einen Namen ohne Leerzeichen (z. B. `neues-feature`).
* **💻 VS Code:** Klicke ganz unten links in der blauen Statusleiste auf `main` (oder auf das Branch-Symbol), wähle **Create new branch...** und tippe den Namen ein.
* **⌨️ Terminal:** 
```bash
git checkout -b neues-feature
```

### 2. KI-Unterstützung nutzen
Lade **ausschließlich** die Datei `src/index.html` in deinen KI-Chat (z. B. Claude) hoch. Lass die KI die gewünschten Anpassungen vornehmen.

### 3. Lokal speichern & Committen
Speichere die von der KI gelieferten Änderungen wieder in exakt derselben Datei (`src/index.html`) ab und erstelle einen Commit mit einer kurzen Beschreibung.
* **💻 VS Code:** Gehe links auf das Symbol für **Quellverwaltung** (Source Control). Klicke beim geänderten File auf das `+` (Stage Changes). Schreibe oben eine Nachricht (z.B. "Neues Feature") und klicke auf **Commit**.
* **⌨️ Terminal:** 
```bash
  git add src/index.html
  git commit -m "Kurze Beschreibung: Neues Vokal-Feature hinzugefügt"
  ```

### 4. Auf GitHub pushen
Lade deinen neuen Branch auf das Remote-Repository hoch.
* **💻 VS Code:** Klicke in der Quellverwaltung auf den blauen Button **Publish Branch** (oder auf **Sync Changes**).
* **⌨️ Terminal:** 
```bash
  git push -u origin neues-feature
  ```

### 5. Pull Request (PR) erstellen
*Dieser Schritt findet immer im Browser statt.*
Wechsle zu GitHub. Dort taucht nun oben ein grüner Button **Compare & pull request** auf. Klicke darauf, um deine Änderungen offiziell zur Integration in den `main`-Branch vorzuschlagen.

### 6. PR annehmen (Mergen)
Prüfe die Änderungen kurz und klicke auf **Merge pull request**. Dein Feature ist nun offiziell im Hauptcode! *(Der alte Feature-Branch wird danach auf GitHub automatisch gelöscht, um Ordnung zu halten).*

### 7. Zurücklehnen (Automatisierung)
Ab hier übernehmen unsere Automaten! Die GitHub Actions starten sofort im Hintergrund, erhöhen die Versionsnummer (`Auto Version Bump`) und veröffentlichen die neue App-Version direkt auf GitHub Pages.

### 8. Lokal wieder synchronisieren
Da der Bot die Versionsnummer auf GitHub erhöht hat, musst du deinen lokalen Rechner wieder auf den neuesten Stand bringen, bevor du das nächste Feature startest.
* **💻 VS Code:** Klicke unten links auf deinen Branch-Namen und wechsle zurück zu `main`. Klicke dann in der Quellverwaltung auf **Sync Changes** (oder auf die kleinen Pfeile unten in der Leiste).
* **⌨️ Terminal:** 
```bash
  git checkout main
  git pull origin main
  ```

---

## 🚀 Release- & Deployment-Automatisierung (Orchestrierung)

Dieses Projekt arbeitet mit vollautomatisierten, miteinander verketteten GitHub Actions. Sobald echter Code im Ordner `src/` auf den `main`-Branch gemergt wird, startet eine automatische Staffelübergabe:

### 1. Auto Version Bump
Als Erstes startet automatisch das Skript zur Versionierung. Es liest die alte Version aus der `src/sw.js` aus, erhöht die Patch-Version (z. B. **1.7.8** → **1.7.9**), aktualisiert die `sw.js` sowie die `manifest.json` und speichert (committet) diese Änderung selbstständig im `main`-Branch.

### 2. Auto Deployment (GitHub Pages)
Diese zweite Action wartet geduldig im Hintergrund. Sobald die *Auto Version Bump*-Action erfolgreich abgeschlossen ist, übernimmt sie das Staffelholz. Sie greift sich **nur** den Ordner `src/` (nun inklusive der brandneuen Versionsnummer) und veröffentlicht ihn als Live-Website. Dadurch sind Prompts und Infrastruktur-Dateien niemals öffentlich im Web sichtbar.

> **Wichtig:** Änderungen, die *außerhalb* des `src/`-Ordners passieren (z. B. wenn du einen neuen Prompt im `.ai_prompts`-Ordner anlegst), lösen diese automatische Kette **nicht** aus.

### 🎛️ Manueller Start
Beide Workflows können bei Bedarf auch jederzeit manuell direkt über die GitHub-Oberfläche gestartet werden:
1. Wechsle auf GitHub in den Reiter **Actions**.
2. Wähle links den gewünschten Workflow aus (z. B. *Deploy PWA to GitHub Pages*).
3. Klicke rechts auf das Dropdown-Menü **Run workflow** und bestätige den Start.

---

## 📱 App Installation (PWA-Nutzung)

Diese Web-App lässt sich wie eine echte, native App auf Endgeräten installieren und funktioniert dank des Service Workers (`sw.js`) auch offline.

* **Android (Chrome)**: Öffne die Website → tippe auf das Drei-Punkte-Menü → wähle **"App installieren"** oder **"Zum Startbildschirm hinzufügen"**.
* **iOS / iPhone (Safari)**: Öffne die Website → tippe auf das **Teilen-Symbol** (Viereck mit Pfeil nach oben) → wähle **"Zum Home-Bildschirm"**.

### Updates beim Nutzer
Wenn im Hintergrund durch GitHub eine neue Version veröffentlicht wurde, lädt die App auf dem Handy das Update beim nächsten Start automatisch herunter. Im Footer der App ist stets die aktuell geladene Version ersichtlich.

---
*Erstellt für die Matteänglisch-Community.*