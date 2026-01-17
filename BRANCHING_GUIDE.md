# Branch Naming Conventions

To keep our repository organized, all branches must follow the strict `category/name` format.

## Structure
`category/description-of-change`

## Categories
| Category | Usage | Example |
| :--- | :--- | :--- |
| **feat** | New features or major updates | `feat/dashboard-setup` |
| **fix** | Bug fixes | `fix/data-loader-error` |
| **docs** | Documentation changes | `docs/update-readme` |
| **chore** | Maintenance, dependencies, or config | `chore/update-bun` |
| **releases** | Release versions | `releases/v1.0.0` |
| **refactor** | Code restructuring without behavior change | `refactor/api-utils` |
| **test** | Adding or modifying tests | `test/model-metrics` |

## Examples

✅ **Good:**
- `feat/user-login`
- `fix/login-bug`
- `releases/beta-2`

❌ **Bad:**
- `login-feature` (Missing category)
- `fix_bug` (Use slash `/` separator)
- `Feat/Login` (Use lowercase)
