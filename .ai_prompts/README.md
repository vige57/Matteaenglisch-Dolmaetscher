# 🤖 AI-Prompts – Wichtige Infos für dieses Verzeichnis

Hallo! Dieser Ordner (`.ai_prompts`) ist ein spezieller "Tresor" für alle Projekt-Prompts und KI-Anweisungen. 

Hier ist kurz und knapp erklärt, warum dieser Ordner existiert und wie du ihn optimal nutzt, ohne deine KI-Ressourcen zu verschwenden.

---

## Warum verstecken wir die Prompts?

KI-Programmierassistenten (wie Cursor, GitHub Copilot, Aider oder ChatGPT) scannen standardmäßig das gesamte Projektverzeichnis. Sie versuchen, den Kontext zu verstehen, um bestmögliche Code-Vorschläge zu machen.

Wenn wir unsere Prompts als normale Textdateien im Hauptprojekt ablegen, passieren zwei Dinge:

* **Token-Verschwendung:** Die KI lädt die Prompts im Hintergrund bei fast jeder Anfrage mit in ihren Arbeitsspeicher (das sogenannte "Context Window"). Das frisst völlig unnötig deine wertvollen Tokens.
* **Verwirrung:** Die KI verwechselt die textlichen Anweisungen in den Prompts oft mit echtem Quellcode oder der Logik der App. Das führt zu fehlerhaften Code-Vorschlägen.

---

## Unsere Schutzmaßnahmen

Damit die Prompts sicher über Git versioniert werden können, ohne die KIs zu triggern, nutzen wir in diesem Projekt einen doppelten Boden:

* **Die Ignore-Dateien:** Im Hauptverzeichnis des Projekts liegen versteckte Dateien (wie `.aiignore`, `.cursorignore`, `.copilotignore`). Diese wirken wie ein Stoppschild und verbieten den gängigsten KIs ausdrücklich, diesen Ordner zu lesen.
* **Verschleierte Dateiendung:** Wir nutzen für die Prompts bewusst die Endung `.promptasset` anstelle von `.txt` oder `.md`. Dadurch stufen KI-Agenten die Dateien als "unbekanntes Systemformat" ein und ignorieren sie, selbst wenn sie die Stoppschilder umgehen sollten.

---

## Wie du neue Prompts hinzufügst

Das Arbeiten mit den Prompts in VS Code ist weiterhin ganz einfach:

1. Erstelle eine neue Datei in diesem Ordner (`.ai_prompts`).
2. Nenne die Datei nach deinem gewünschten Thema (z. B. `design-anpassungen`).
3. Verwende **zwingend** die Dateiendung `.promptasset` (Ergebnis: `design-anpassungen.promptasset`).
4. Öffne die Datei ganz normal in VS Code, füge deinen Text ein und speichere ab.

Git wird deine Prompts ganz normal sichern, aber deine KI-Tokens bleiben ab sofort zu 100 % für den eigentlichen Programmcode des Matteänglisch-Dolmetschers reserviert!