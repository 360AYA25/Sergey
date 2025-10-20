#!/bin/bash

# 🔧 Git Hooks Installer
# Устанавливает git hooks в текущий проект

echo "🔧 Git Hooks Installer"
echo "====================="
echo ""

# Проверка что мы в git репозитории
if [ ! -d ".git" ]; then
  echo "❌ Error: Not in a git repository!"
  echo "   Please run this script from the root of your git project."
  exit 1
fi

# Путь к templates
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HOOKS_DIR=".git/hooks"

echo "📁 Installing hooks from: $SCRIPT_DIR"
echo "📁 To: $(pwd)/$HOOKS_DIR"
echo ""

# Список hooks для установки
HOOKS=("pre-commit" "commit-msg" "pre-push")

# Установка каждого hook
for hook in "${HOOKS[@]}"; do
  SOURCE="$SCRIPT_DIR/$hook"
  DEST="$HOOKS_DIR/$hook"

  if [ ! -f "$SOURCE" ]; then
    echo "⚠️  Warning: Template $hook not found, skipping..."
    continue
  fi

  # Проверка существует ли уже hook
  if [ -f "$DEST" ]; then
    echo "⚠️  $hook already exists"
    read -p "   Overwrite? (yes/no): " choice
    case "$choice" in
      yes|YES|Y|y )
        cp "$SOURCE" "$DEST"
        chmod +x "$DEST"
        echo "✅ $hook installed (overwritten)"
        ;;
      * )
        echo "⏭️  $hook skipped"
        ;;
    esac
  else
    cp "$SOURCE" "$DEST"
    chmod +x "$DEST"
    echo "✅ $hook installed"
  fi
done

echo ""
echo "🎉 Installation complete!"
echo ""
echo "Installed hooks:"
echo "  - pre-commit:  Checks credentials, large files, .env"
echo "  - commit-msg:  Validates commit message format"
echo "  - pre-push:    Warns before pushing to main, checks WIP commits"
echo ""
echo "📚 See README.md for usage:"
echo "   cat $SCRIPT_DIR/README.md"
echo ""
