# Oltreilconfine - Sito Web Django

Questo è un progetto Django per il sito web "Oltreilconfine".

## Prerequisiti

- Python 3.12 o superiore
- pip (gestore pacchetti Python)

## Struttura del Progetto

```
Oltreilconfine/
├── manage.py              # Script di gestione Django
├── env/                   # Ambiente virtuale Python
├── oltreilconfine/        # Directory principale del progetto Django
├── sito_oltreilconfine/   # Applicazione Django principale
├── db.sqlite3            # Database SQLite
└── README.md             # Questo file
```

## Setup e Avvio Rapido

### 1. Attivazione dell'Ambiente Virtuale

Per attivare l'ambiente virtuale, esegui:

```bash
# Su macOS/Linux
source env/bin/activate

# Su Windows
env\Scripts\activate
```

L'ambiente virtuale è già configurato con Django 6.0.3 e le dipendenze necessarie.

### 2. Avvio del Server di Sviluppo

Dopo aver attivato l'ambiente virtuale, avvia il server Django:

```bash
# Metodo 1: Con ambiente virtuale attivato
python manage.py runserver

# Metodo 2: Senza attivare l'ambiente (direttamente)
env/bin/python manage.py runserver

# Metodo 3: Specificando indirizzo e porta (consigliato)
env/bin/python manage.py runserver 0.0.0.0:8000
```

Il server sarà disponibile all'indirizzo:
- http://127.0.0.1:8000
- http://localhost:8000

### 3. Comandi Utili

#### Verifica dello Stato del Progetto
```bash
# Controlla se ci sono problemi nel progetto
env/bin/python manage.py check

# Elenca le migrazioni applicate
env/bin/python manage.py showmigrations

# Mostra la configurazione del progetto
env/bin/python manage.py diffsettings
```

#### Gestione del Database
```bash
# Crea e applica le migrazioni
env/bin/python manage.py makemigrations
env/bin/python manage.py migrate

# Crea un superutente per l'admin Django
env/bin/python manage.py createsuperuser

# Apre la shell Django interattiva
env/bin/python manage.py shell
```

#### Gestione dei File Statici
```bash
# Raccoglie tutti i file statici in una directory
env/bin/python manage.py collectstatic
```

## Troubleshooting

### Problemi Comuni

1. **"Couldn't import Django"**
   - Assicurati di aver attivato l'ambiente virtuale
   - Verifica che Django sia installato: `env/bin/pip list`

2. **Porta già in uso**
   - Cambia porta: `env/bin/python manage.py runserver 8001`

3. **Errori di migrazione**
   - Esegui: `env/bin/python manage.py migrate --run-syncdb`

### Verifica dell'Ambiente

Per verificare che tutto sia configurato correttamente:

```bash
# Verifica la versione di Python
env/bin/python --version

# Verifica Django
env/bin/python -c "import django; print(django.get_version())"

# Verifica le dipendenze installate
env/bin/pip list
```

## Sviluppo

### Flusso di Lavoro Tipico

1. Attiva l'ambiente virtuale
2. Avvia il server di sviluppo
3. Apri http://localhost:8000 nel browser
4. Modifica il codice
5. Il server si ricarica automaticamente

### Struttura delle Applicazioni

- **oltreilconfine/**: Configurazione principale del progetto
- **sito_oltreilconfine/**: Applicazione principale con template, views e modelli

## Deployment

Per il deployment in produzione, assicurati di:

1. Impostare `DEBUG = False` in settings
2. Configurare variabili d'ambiente sensibili
3. Utilizzare un server WSGI come Gunicorn
4. Configurare un web server come Nginx
5. Servire file statici tramite CDN o web server

## Licenza

[Aggiungere informazioni sulla licenza]
