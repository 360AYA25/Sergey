# 🎮 Интерактивный режим

## Что это?

В интерактивном режиме **ТЫ сам выбираешь** лучший план после того как 3 AI агента предложат свои варианты.

---

## 🚀 Как использовать

### Режим 1: Автоматический (по умолчанию)

```bash
./start.sh "Create webhook that logs to Notion"
```

**Что происходит:**
- 3 AI создают планы
- Система автоматически выбирает лучший (голосование)
- Строится workflow

**Когда использовать:** Для простых задач где доверяешь AI

---

### Режим 2: Интерактивный (ТЫ выбираешь) 🎮

```bash
./start.sh -i "Create webhook that logs to Notion"
```

**Что происходит:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 ИНТЕРАКТИВНЫЙ РЕЖИМ - Выбери план!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. planner-gpt (Score: 59.0)
   Сложность: 3
   Время: 30 minutes
   Maintainability: 7/10
   План: Создаю простой webhook сервер на Node.js...

2. planner-gemini (Score: 44.0)
   Сложность: 5
   Время: 1-2 hours
   Maintainability: 8/10
   План: Готово! Я создал простой webhook в n8n...

3. architect (Score: 59.0)
   Сложность: 3
   Время: 30 minutes
   Maintainability: 9/10
   План: Рекомендую использовать Pattern #2...

AI рекомендует: planner-gpt (лучший score)

Твой выбор (1-3, Enter = рекомендация AI): _
```

**Ты вводишь:**
- `1` - выбрать plan #1 (GPT)
- `2` - выбрать plan #2 (Gemini)
- `3` - выбрать plan #3 (Architect)
- `Enter` - довериться AI рекомендации

**Когда использовать:**
- Хочешь сам контролировать процесс
- Важный/сложный workflow
- Не согласен с выбором AI

---

## 👍 Preferences - указываем любимые сервисы

### Режим 3: Предпочитаемые сервисы

```bash
./start.sh -p "Airtable,Supabase" "Create database logger"
```

**Что происходит:**
- Агентам передаётся: "Prefer Airtable and Supabase"
- Они будут предлагать планы с этими сервисами
- Если невозможно - предложат альтернативу

---

### Режим 4: Избегаемые сервисы

```bash
./start.sh -p "avoid:Notion" "Create database logger"
```

**Что происходит:**
- Агентам передаётся: "Avoid Notion"
- Они НЕ будут предлагать Notion
- Предложат Airtable, Supabase, или другие

---

### Режим 5: Комбо (предпочтения + избегание)

```bash
./start.sh -p "Airtable,avoid:Notion,avoid:Google Sheets" "Create logger"
```

**Расшифровка:**
- ✅ Prefer: Airtable
- ❌ Avoid: Notion, Google Sheets

---

### Режим 6: Всё вместе 🔥

```bash
./start.sh -i -p "Airtable,avoid:Notion" "Create database logger"
```

**Максимальный контроль:**
1. Агенты учитывают твои предпочтения
2. Создают 3 плана (Airtable первый приоритет, без Notion)
3. ТЫ выбираешь лучший
4. Система строит workflow

---

## 📋 Примеры использования

### Пример 1: Не люблю Notion

```bash
./start.sh -p "avoid:Notion" "Create food tracker"
```

**Результат:** Агенты предложат Airtable, Supabase, или другие БД

---

### Пример 2: Только Telegram + Supabase

```bash
./start.sh -p "Telegram,Supabase" "Create bot with database"
```

**Результат:** Агенты будут использовать эти сервисы

---

### Пример 3: Хочу сам выбрать архитектуру

```bash
./start.sh -i "Create complex workflow with AI"
```

**Результат:**
- GPT: быстрое решение (может быть упрощённое)
- Gemini: глубокий анализ (может быть over-engineered)
- Architect: best practices (золотая середина)

ТЫ выбираешь что подходит лучше!

---

### Пример 4: Важный production workflow

```bash
./start.sh -i -p "Supabase,avoid:Google Sheets" "Create user authentication flow"
```

**Почему так:**
- `-i` - сам выберешь лучший план (важный workflow!)
- `-p "Supabase"` - надёжная БД для production
- `-p "avoid:Google Sheets"` - не подходит для auth

---

## 🎯 Когда использовать что

| Ситуация | Команда | Почему |
|----------|---------|--------|
| Простая задача | `./start.sh "task"` | Доверяешь AI |
| Важный workflow | `./start.sh -i "task"` | Контроль |
| Не нравится сервис | `./start.sh -p "avoid:X" "task"` | Blacklist |
| Любимый сервис | `./start.sh -p "Service" "task"` | Приоритет |
| Production | `./start.sh -i -p "..." "task"` | Максимальный контроль |

---

## 💡 Советы

### 1. Когда использовать `-i`

✅ **ДА:**
- Важный production workflow
- Сложная архитектура
- Не уверен в автоматическом выборе
- Хочешь учиться (смотреть разные подходы)

❌ **НЕТ:**
- Простая задача
- Доверяешь AI
- Нет времени выбирать

---

### 2. Как указывать preferences

**Правильно:**
```bash
-p "Airtable"                    # 1 сервис
-p "Airtable,Supabase"           # Несколько через запятую
-p "avoid:Notion"                # Избегать
-p "Airtable,avoid:Notion"       # Комбо
```

**Неправильно:**
```bash
-p Airtable Supabase     # ❌ без запятой
-p "Airtable Supabase"   # ❌ через пробел
-p Airtable,Supabase     # ❌ без кавычек (может не работать)
```

---

### 3. Какие сервисы можно указывать

**Популярные:**
- `Notion`, `Airtable`, `Google Sheets`
- `Supabase`, `PostgreSQL`, `MySQL`
- `Telegram`, `Slack`, `Discord`
- `Gemini`, `OpenAI`, `Anthropic`

**Любые другие** - просто напиши название!

---

## 🔍 Как это работает изнутри

### Автоматический режим:

```
Planning → 3 планировщика работают параллельно
   ↓
Voting → AI выбирает лучший (score: simplicity + speed + maintainability)
   ↓
Building → Создаётся workflow
```

### Интерактивный режим:

```
Planning → 3 планировщика работают параллельно
   ↓
Voting → AI показывает планы + рекомендацию
   ↓
👤 ЧЕЛОВЕК выбирает лучший (или соглашается с AI)
   ↓
Building → Создаётся workflow
```

### С Preferences:

```
User input: -p "Airtable,avoid:Notion"
   ↓
Planning → Агенты получают:
   {
     preferences: {
       prefer: ["Airtable"],
       avoid: ["Notion"]
     }
   }
   ↓
Планы учитывают предпочтения!
```

---

## 📊 Статистика

### Время выполнения:

| Режим | Время | Почему |
|-------|-------|--------|
| Auto | ~177 сек | Без ожидания человека |
| Interactive | ~180+ сек | +время на выбор |
| With preferences | ~177 сек | То же (preferences не замедляют) |

### Качество:

| Режим | Качество | Комментарий |
|-------|----------|-------------|
| Auto | 7/10 | AI выбирает оптимальный |
| Interactive | 7-9/10 | Зависит от твоего выбора |
| With preferences | 7-8/10 | Ограничения могут снизить |

---

## 🚀 Попробуй прямо сейчас!

```bash
# 1. Простой тест (автоматический)
./start.sh "Create webhook that returns success"

# 2. Интерактивный тест
./start.sh -i "Create webhook that returns success"

# 3. С preferences
./start.sh -p "avoid:Notion" "Create database logger"

# 4. Всё вместе
./start.sh -i -p "Airtable,avoid:Notion" "Create food tracker"
```

---

**Теперь у тебя полный контроль! 🎮**
