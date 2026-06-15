# Flor D'Lune Composer Convention

**Standard version:** Composer 2.5.0

**Installation (system):** PHP 8.5.6 (Homebrew) + Composer 2.5.0 installed globally.

**Project structure:**
- Every PHP-enabled Flor D'Lune project has its own `composer.json` in the project root.
- No shared/global packages unless strictly necessary.

**Install command (always use this):**
```bash
composer install --no-interaction --prefer-dist
```

**PHP target:** 8.1 or higher

**Notes:**
- This convention applies to all future Flor D'Lune projects that require PHP dependencies.
- The current Next.js website does not use Composer.