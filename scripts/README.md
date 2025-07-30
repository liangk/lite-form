# NPM Package Publishing Scripts

This directory contains scripts for building and publishing the `lite-form` Angular library to GitHub Packages.

## Files

- `build-and-publish.sh` - Bash script for Linux/macOS
- `build-and-publish.ps1` - PowerShell script for Windows
- `README.md` - This documentation

## Automated Publishing (GitHub Actions)

The GitHub Actions workflow (`.github/workflows/npm-publish-github-packages.yml`) automatically:

1. **On Pull Request to main**: Publishes a pre-release version with format `x.y.z-pr.{PR_NUMBER}.{TIMESTAMP}`
2. **On Push to main**: Publishes a production version with auto-incremented patch version

### Setup for GitHub Actions

1. **Repository Settings**: Ensure GitHub Actions has the necessary permissions:
   - Go to Repository Settings → Actions → General
   - Under "Workflow permissions", select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"

2. **Automatic Authentication**: The workflow uses `GITHUB_TOKEN` automatically (no additional setup required)

3. **Package Publishing**: Packages will be published to `@liangk/lite-form` scope

## Manual Publishing

### Prerequisites

1. **Authentication**: Set up authentication for GitHub Packages
   ```bash
   # Option 1: Using GITHUB_TOKEN environment variable
   export GITHUB_TOKEN=your_github_token
   
   # Option 2: Login via npm
   npm login --scope=@liangk --registry=https://npm.pkg.github.com
   ```

2. **Permissions**: Ensure you have write access to the repository's packages

### Usage

#### Linux/macOS (Bash)
```bash
# Make script executable
chmod +x scripts/build-and-publish.sh

# Increment patch version (0.1.0 -> 0.1.1)
./scripts/build-and-publish.sh

# Increment minor version (0.1.0 -> 0.2.0)
./scripts/build-and-publish.sh minor

# Increment major version (0.1.0 -> 1.0.0)
./scripts/build-and-publish.sh major

# Set specific version
./scripts/build-and-publish.sh 1.2.3
```

#### Windows (PowerShell)
```powershell
# Increment patch version (0.1.0 -> 0.1.1)
.\scripts\build-and-publish.ps1

# Increment minor version (0.1.0 -> 0.2.0)
.\scripts\build-and-publish.ps1 -VersionType minor

# Increment major version (0.1.0 -> 1.0.0)
.\scripts\build-and-publish.ps1 -VersionType major

# Set specific version
.\scripts\build-and-publish.ps1 -VersionType "1.2.3"
```

## What the Scripts Do

1. **Validation**
   - Check if running from correct directory
   - Warn about uncommitted changes

2. **Build Process**
   - Clean previous builds
   - Install dependencies if needed
   - Build library in production mode
   - Update package name to scoped version (`@liangk/lite-form`)

3. **Version Management**
   - Show current version
   - Update version based on type or specific version
   - Create package tarball

4. **Publishing**
   - Confirm before publishing
   - Publish to GitHub Packages
   - Create and optionally push git tags

## Package Information

- **Package Name**: `@liangk/lite-form`
- **Registry**: `https://npm.pkg.github.com`
- **Scope**: `@liangk`

## Installation

After publishing, users can install the package with:

```bash
# Configure npm to use GitHub Packages for @liangk scope
npm config set @liangk:registry https://npm.pkg.github.com

# Install the package
npm install @liangk/lite-form
```

Or with a `.npmrc` file in their project:
```
@liangk:registry=https://npm.pkg.github.com
```

## Troubleshooting

### GitHub Actions Permission Issues
If you see "Permission denied" errors for git operations:

1. **Check Repository Settings**:
   - Go to Settings → Actions → General
   - Under "Workflow permissions", select "Read and write permissions"
   - Enable "Allow GitHub Actions to create and approve pull requests"

2. **Alternative: Use Personal Access Token**:
   - Create a Personal Access Token with `repo` and `write:packages` scopes
   - Add it as a repository secret named `PAT_TOKEN`
   - Update the workflow to use `token: ${{ secrets.PAT_TOKEN }}` in checkout step

### Authentication Issues
- Ensure `GITHUB_TOKEN` has `packages:write` permission
- For personal access tokens, enable "write:packages" scope
- Verify you have push access to the repository

### Build Issues
- Ensure all dependencies are installed: `npm ci`
- Check Angular version compatibility
- Verify `ng-packagr` is properly configured

### Publishing Issues
- Check package name doesn't conflict with existing packages
- Ensure version number is higher than previously published versions
- Verify network connectivity to GitHub Packages registry

## Version Strategy

- **Patch** (x.y.Z): Bug fixes, small improvements
- **Minor** (x.Y.z): New features, backward compatible
- **Major** (X.y.z): Breaking changes

The automated workflow uses patch increments for main branch pushes and pre-release versions for pull requests.
