# Build and Publish Script for lite-form NPM Package (PowerShell)
# Usage: .\scripts\build-and-publish.ps1 [version-type]
# version-type: patch, minor, major, or specific version like 1.2.3

param(
    [string]$VersionType = "patch"
)

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if we're in the right directory
if (-not (Test-Path "package.json") -or -not (Test-Path "angular.json")) {
    Write-Error "This script must be run from the root directory of the lite-form project"
    exit 1
}

# Check if git is clean
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Warning "Working directory is not clean. Consider committing your changes first."
    $continue = Read-Host "Continue anyway? (y/N)"
    if ($continue -notmatch "^[Yy]$") {
        exit 1
    }
}

Write-Status "Building lite-form library..."

# Clean previous build
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Status "Cleaned previous build"
}

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Status "Installing dependencies..."
    npm ci
}

# Build the library
Write-Status "Building library in production mode..."
npm run build:lib

if (-not (Test-Path "dist\lite-form")) {
    Write-Error "Build failed - dist\lite-form directory not found"
    exit 1
}

Set-Location "dist\lite-form"

# Update package name with scope
Write-Status "Updating package configuration..."
$updateScript = @"
const pkg = require('./package.json');
pkg.name = '@liangk/lite-form';
require('fs').writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
console.log('Updated package name to: ' + pkg.name);
"@

node -e $updateScript

# Version management
$currentVersion = node -p "require('./package.json').version"
Write-Status "Current version: $currentVersion"

if ($VersionType -match "^[0-9]+\.[0-9]+\.[0-9]+(-.*)?$") {
    # Specific version provided
    npm version $VersionType --no-git-tag-version
}
else {
    # Increment version
    switch ($VersionType) {
        { $_ -in @("major", "minor", "patch") } {
            npm version $VersionType --no-git-tag-version
        }
        default {
            Write-Error "Invalid version type: $VersionType"
            Write-Error "Valid options: patch, minor, major, or specific version (e.g., 1.2.3)"
            exit 1
        }
    }
}

$newVersion = node -p "require('./package.json').version"
Write-Success "Updated version to: $newVersion"

# Show package info
Write-Status "Package information:"
$packageName = node -p "require('./package.json').name"
$registry = node -p "require('./package.json').publishConfig?.registry || 'default'"
Write-Host "  Name: $packageName"
Write-Host "  Version: $newVersion"
Write-Host "  Registry: $registry"

# Create package tarball
Write-Status "Creating package tarball..."
npm pack

$tarballName = "liangk-lite-form-$newVersion.tgz"
if (Test-Path $tarballName) {
    Write-Success "Package created: $tarballName"
}
else {
    Write-Error "Failed to create package tarball"
    exit 1
}

# Ask for confirmation before publishing
Write-Host ""
$publish = Read-Host "Do you want to publish this package to GitHub Packages? (y/N)"
if ($publish -match "^[Yy]$") {
    Write-Status "Publishing to GitHub Packages..."
    
    # Check if GITHUB_TOKEN is set
    if (-not $env:GITHUB_TOKEN) {
        Write-Warning "GITHUB_TOKEN environment variable not set"
        Write-Status "Please make sure you're authenticated with GitHub Packages"
        Write-Status "You can set GITHUB_TOKEN or use 'npm login --scope=@liangk --registry=https://npm.pkg.github.com'"
    }
    
    # Publish
    $publishResult = npm publish
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Package published successfully!"
        Write-Success "Install with: npm install @liangk/lite-form@$newVersion"
        
        # Go back to root and create git tag
        Set-Location "..\.."
        Write-Status "Creating git tag v$newVersion..."
        git tag -a "v$newVersion" -m "Release version $newVersion"
        
        $pushTag = Read-Host "Push tag to origin? (y/N)"
        if ($pushTag -match "^[Yy]$") {
            git push origin "v$newVersion"
            Write-Success "Tag pushed to origin"
        }
    }
    else {
        Write-Error "Failed to publish package"
        exit 1
    }
}
else {
    Write-Status "Package not published. Tarball is available at: dist\lite-form\$tarballName"
}

Write-Success "Build and publish script completed!"
