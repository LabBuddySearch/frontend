#!/bin/bash

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Запуск Labster приложения${NC}"

# Путь к бекенду
BACKEND_PATH="/Users/admin/Desktop/Университет /5 Семестр/ПП/Labster"

# Проверяем существование папки бекенда
if [ ! -d "$BACKEND_PATH" ]; then
    echo -e "${RED}❌ Ошибка: Папка бекенда не найдена по пути: $BACKEND_PATH${NC}"
    exit 1
fi

echo -e "${YELLOW}🐳 Запуск Docker контейнеров (бекенд будет собран внутри Docker)...${NC}"
docker-compose up --build -d

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Ошибка при запуске Docker контейнеров${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Все сервисы запущены!${NC}"
echo ""
echo -e "${GREEN}📝 Доступные сервисы:${NC}"
echo -e "  🌐 Фронтенд:     http://localhost"
echo -e "  🔧 Backend API:  http://localhost:8080/api"
echo -e "  💾 PostgreSQL:   localhost:5432"
echo -e "  📦 MinIO:        http://localhost:9000"
echo -e "  🖥️  MinIO Console: http://localhost:9001"
echo ""
echo -e "${YELLOW}Для просмотра логов: docker-compose logs -f${NC}"
echo -e "${YELLOW}Для остановки: docker-compose down${NC}"
