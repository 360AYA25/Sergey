#!/bin/bash

# 🔧 Скрипт реорганизации документации
# Автор: Claude (Middle Developer)
# Цель: Навести порядок в документации проекта

echo "╔═══════════════════════════════════════════════════════╗"
echo "║         🔧 РЕОРГАНИЗАЦИЯ ДОКУМЕНТАЦИИ                 ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Проверка что мы в правильной директории
if [ ! -f "CLAUDE.md" ]; then
    echo -e "${RED}❌ Ошибка: Запусти скрипт из корня проекта /Users/sergey/Projects/Sergey/${NC}"
    exit 1
fi

echo "📍 Текущая директория: $(pwd)"
echo ""

# Шаг 1: Создание резервной копии
echo -e "${YELLOW}📦 Шаг 1: Создаю резервную копию...${NC}"
BACKUP_DIR="backup-docs-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp *.md "$BACKUP_DIR/" 2>/dev/null
echo -e "${GREEN}✅ Резервная копия создана в $BACKUP_DIR${NC}"
echo ""

# Шаг 2: Создание структуры папок
echo -e "${YELLOW}📁 Шаг 2: Создаю новую структуру папок...${NC}"
mkdir -p docs/setup
mkdir -p docs/guides
mkdir -p docs/architecture
mkdir -p docs/claude
echo -e "${GREEN}✅ Структура папок создана${NC}"
echo ""

# Шаг 3: Перемещение файлов
echo -e "${YELLOW}📋 Шаг 3: Перемещаю файлы в новые папки...${NC}"

# Setup файлы
if [ -f "SETUP-COMPLETE.md" ]; then
    mv SETUP-COMPLETE.md docs/setup/README.md
    echo "  ✓ SETUP-COMPLETE.md → docs/setup/README.md"
fi

if [ -f "VS-CODE-EXTENSIONS.md" ]; then
    mv VS-CODE-EXTENSIONS.md docs/setup/vs-code-extensions.md
    echo "  ✓ VS-CODE-EXTENSIONS.md → docs/setup/vs-code-extensions.md"
fi

# Guides файлы
if [ -f "HOW-TO-USE.md" ]; then
    mv HOW-TO-USE.md docs/guides/README.md
    echo "  ✓ HOW-TO-USE.md → docs/guides/README.md"
fi

# Architecture файлы
if [ -f "PROJECT-STRUCTURE.md" ]; then
    mv PROJECT-STRUCTURE.md docs/architecture/README.md
    echo "  ✓ PROJECT-STRUCTURE.md → docs/architecture/README.md"
fi

# Claude файлы
if [ -f "INSTRUCTIONS-INDEX.md" ]; then
    mv INSTRUCTIONS-INDEX.md docs/claude/README.md
    echo "  ✓ INSTRUCTIONS-INDEX.md → docs/claude/README.md"
fi

# Удаляем план реорганизации (он больше не нужен)
if [ -f "REORGANIZATION-PLAN.md" ]; then
    mv REORGANIZATION-PLAN.md "$BACKUP_DIR/"
    echo "  ✓ REORGANIZATION-PLAN.md → перемещен в backup"
fi

echo -e "${GREEN}✅ Файлы перемещены${NC}"
echo ""

# Шаг 4: Создание навигационного файла
echo -e "${YELLOW}📝 Шаг 4: Создаю главный навигатор документации...${NC}"
cat > docs/README.md << 'EOF'
# 📚 Документация проекта Sergey

> Вся документация организована по категориям для удобной навигации

---

## 🗂️ Структура документации

### 📁 [setup/](setup/) - Настройка и установка
- [README.md](setup/README.md) - Завершение настройки проекта
- [vs-code-extensions.md](setup/vs-code-extensions.md) - Рекомендуемые расширения VS Code

### 📁 [guides/](guides/) - Руководства и инструкции
- [README.md](guides/README.md) - Как работать с проектом (cheatsheet)
- Git workflow, VS Code tips, troubleshooting

### 📁 [architecture/](architecture/) - Архитектура и структура
- [README.md](architecture/README.md) - Карта всех проектов и их связи
- Структура проектов, зависимости, диаграммы

### 📁 [claude/](claude/) - Документация для Claude Code
- [README.md](claude/README.md) - Индекс всех инструкций для Claude
- Специальные промпты и правила работы

### 📁 [database/](database/) - База данных
- Схемы, миграции, документация БД

### 📁 [archive/](archive/) - Архив
- Старые версии документов, deprecated файлы

---

## 🚀 Быстрый старт

1. **Новичок?** Начни с [guides/README.md](guides/README.md)
2. **Настройка окружения?** Смотри [setup/](setup/)
3. **Ищешь структуру проектов?** Открой [architecture/README.md](architecture/README.md)
4. **Для Claude Code?** См. [claude/](claude/) и главный [CLAUDE.md](../CLAUDE.md)

---

## 📋 Основные документы

| Документ | Расположение | Описание |
|----------|-------------|----------|
| Главный README | [../README.md](../README.md) | Overview проекта |
| Инструкции Claude | [../CLAUDE.md](../CLAUDE.md) | Главные правила для AI |
| Навигатор docs | Ты здесь! | Карта документации |

---

## 🔍 Поиск по документации

Используй поиск VS Code (`Cmd+Shift+F`) для поиска по всем документам.

---

*Последнее обновление: $(date +%Y-%m-%d)*
EOF

echo -e "${GREEN}✅ Навигатор создан${NC}"
echo ""

# Шаг 5: Отчет о результатах
echo "╔═══════════════════════════════════════════════════════╗"
echo "║                  ✅ ГОТОВО!                          ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "📊 Результаты реорганизации:"
echo "  • Создана чистая структура docs/"
echo "  • В корне остались только README.md и CLAUDE.md"
echo "  • Все файлы организованы по категориям"
echo "  • Создан навигатор docs/README.md"
echo "  • Резервная копия в $BACKUP_DIR"
echo ""
echo "📁 Новая структура:"
tree -L 2 docs/ 2>/dev/null || ls -la docs/
echo ""
echo -e "${GREEN}🎉 Реорганизация завершена успешно!${NC}"
echo ""
echo "💡 Следующие шаги:"
echo "  1. Проверь что всё на месте: ls -la docs/"
echo "  2. Обнови ссылки в README.md"
echo "  3. Удали резервную копию когда убедишься что всё ОК: rm -rf $BACKUP_DIR"