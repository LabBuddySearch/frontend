# Инструкция по запуску Labster в Docker

Этот проект объединяет фронтенд, бекенд, PostgreSQL и MinIO в единую Docker-систему.

## Предварительные требования

- Docker и Docker Compose установлены
- Для сборки бекенда: Java 17+ и Gradle (или используйте скрипт сборки)

## Структура проекта

```
frontend/                    # React фронтенд
├── docker-compose.yml       # Общая конфигурация всех сервисов
├── Dockerfile              # Dockerfile для фронтенда
├── nginx.conf              # Конфигурация nginx для проксирования API
└── docker-start.sh         # Скрипт автоматического запуска

backend/ (Labster/)         # Spring Boot бекенд
└── Dockerfile              # Dockerfile для бекенда
```

## Быстрый запуск

### Автоматический запуск

```bash
cd /Users/admin/frontend
./docker-start.sh
```

Скрипт автоматически:
1. Запустит все Docker контейнеры
2. Бекенд будет собран автоматически внутри Docker контейнера с правильной версией Java

**Примечание:** Не нужно собирать бекенд вручную - сборка происходит автоматически в Docker с использованием Java 17, что решает проблемы совместимости.

### Альтернативный запуск

```bash
cd /Users/admin/frontend
docker-compose up --build -d
```

## Доступные сервисы

После запуска будут доступны:

- **Фронтенд**: http://localhost
- **Backend API**: http://localhost:8080/api
- **PostgreSQL**: localhost:5432
  - База данных: `labsterdb`
  - Пользователь: `postgres`
  - Пароль: `postgres`
- **MinIO**: http://localhost:9000
- **MinIO Console**: http://localhost:9001
  - Пользователь: `minioadmin`
  - Пароль: `minioadmin123`

## Полезные команды

### Просмотр логов
```bash
docker-compose logs -f                    # Все сервисы
docker-compose logs -f frontend          # Только фронтенд
docker-compose logs -f backend           # Только бекенд
docker-compose logs -f postgres          # Только PostgreSQL
```

### Остановка сервисов
```bash
docker-compose down                       # Остановить и удалить контейнеры
docker-compose down -v                    # Остановить и удалить контейнеры + volumes (данные БД будут удалены!)
```

### Перезапуск сервисов
```bash
docker-compose restart                    # Перезапустить все сервисы
docker-compose restart backend           # Перезапустить только бекенд
```

### Пересборка после изменений
```bash
# После изменений в бекенде (сборка происходит в Docker)
cd /Users/admin/frontend
docker-compose up --build -d backend

# После изменений во фронтенде
cd /Users/admin/frontend
docker-compose up --build -d frontend
```

## Архитектура

```
┌─────────────┐
│  Frontend   │ (nginx:80)
│  (React)    │
└──────┬──────┘
       │ /api/* → proxy
       ▼
┌─────────────┐
│  Backend    │ (Spring Boot:8080)
│  (Java)     │
└──────┬──────┘
       │
       ├───► PostgreSQL:5432 (база данных)
       │
       └───► MinIO:9000 (файловое хранилище)
```

## Устранение проблем

### Бекенд не запускается
- Бекенд автоматически собирается в Docker - проверьте логи сборки: `docker-compose logs backend`
- Если сборка не удалась, проверьте исходный код и зависимости в `build.gradle`

### Фронтенд не может подключиться к API
- Убедитесь, что бекенд запущен: `docker-compose ps`
- Проверьте nginx конфигурацию и логи: `docker-compose logs frontend`

### PostgreSQL не доступен
- Проверьте, что порт 5432 свободен
- Проверьте логи: `docker-compose logs postgres`

### MinIO не доступен
- Проверьте, что порты 9000 и 9001 свободны
- Проверьте логи: `docker-compose logs minio`

### Порты уже заняты
Если порты заняты, измените маппинг портов в `docker-compose.yml`:
```yaml
ports:
  - "3000:80"  # Вместо "80:80" для фронтенда
  - "8081:8080" # Вместо "8080:8080" для бекенда
```

## Переменные окружения

Все переменные окружения можно настроить в `docker-compose.yml` в секциях `environment` для каждого сервиса.

## Volumes (хранилище данных)

Данные сохраняются в Docker volumes:
- `postgres_data` - данные PostgreSQL
- `minio_data` - файлы MinIO

Для удаления всех данных используйте: `docker-compose down -v`
