#!/bin/bash

# 🔧 Git Hooks Installer
# Installs git hooks in current project

echo "🔧 Git Hooks Installer"
echo "====================="
echo ""

# Check that we're in a git repository
if [ ! -d ".git" ]; then
  echo "❌ Error: Not in a git repository!"
  echo "   Please run this script from the root of your git project."
  exit 1
fi

# Path to templates
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HOOKS_DIR=".git/hooks"

echo "📁 Installing hooks from: $SCRIPT_DIR"
echo "📁 To: $(pwd)/$HOOKS_DIR"
echo ""

# List of hooks to install
HOOKS=("pre-commit" "commit-msg" "pre-push")

# Install each hook
for hook in "${HOOKS[@]}"; do
  SOURCE="$SCRIPT_DIR/$hook"
  DEST="$HOOKS_DIR/$hook"

  if [ ! -f "$SOURCE" ]; then
    echo "⚠️  Warning: Template $hook not found, skipping..."
    continue
  fi

  # Check if hook already exists
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
