#!/bin/bash

# Build and Publish Script for lite-form NPM Package
# Usage: ./scripts/build-and-publish.sh [version-type]
# version-type: patch, minor, major, or specific version like 1.2.3

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "angular.json" ]; then
    print_error "This script must be run from the root directory of the lite-form project"
    exit 1
fi

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
    print_warning "Working directory is not clean. Consider committing your changes first."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Version management
VERSION_TYPE=${1:-patch}
print_status "Building lite-form library..."

# Clean previous build
if [ -d "dist" ]; then
    rm -rf dist
    print_status "Cleaned previous build"
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm ci
fi

# Build the library
print_status "Building library in production mode..."
npm run build:lib

if [ ! -d "dist/lite-form" ]; then
    print_error "Build failed - dist/lite-form directory not found"
    exit 1
fi

cd dist/lite-form

# Update package name with scope
print_status "Updating package configuration..."
node -e "
const pkg = require('./package.json');
pkg.name = '@liangk/lite-form';
require('fs').writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
console.log('Updated package name to: ' + pkg.name);
"

# Version management
CURRENT_VERSION=$(node -p "require('./package.json').version")
print_status "Current version: $CURRENT_VERSION"

if [[ $VERSION_TYPE =~ ^[0-9]+\.[0-9]+\.[0-9]+(-.*)?$ ]]; then
    # Specific version provided
    NEW_VERSION=$VERSION_TYPE
    npm version $NEW_VERSION --no-git-tag-version
else
    # Increment version
    case $VERSION_TYPE in
        major|minor|patch)
            npm version $VERSION_TYPE --no-git-tag-version
            ;;
        *)
            print_error "Invalid version type: $VERSION_TYPE"
            print_error "Valid options: patch, minor, major, or specific version (e.g., 1.2.3)"
            exit 1
            ;;
    esac
fi

NEW_VERSION=$(node -p "require('./package.json').version")
print_success "Updated version to: $NEW_VERSION"

# Show package info
print_status "Package information:"
echo "  Name: $(node -p "require('./package.json').name")"
echo "  Version: $NEW_VERSION"
echo "  Registry: $(node -p "require('./package.json').publishConfig?.registry || 'default'")"

# Create package tarball
print_status "Creating package tarball..."
npm pack

TARBALL_NAME="liangk-lite-form-${NEW_VERSION}.tgz"
if [ -f "$TARBALL_NAME" ]; then
    print_success "Package created: $TARBALL_NAME"
else
    print_error "Failed to create package tarball"
    exit 1
fi

# Ask for confirmation before publishing
echo
read -p "Do you want to publish this package to GitHub Packages? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Publishing to GitHub Packages..."
    
    # Check if GITHUB_TOKEN is set
    if [ -z "$GITHUB_TOKEN" ]; then
        print_warning "GITHUB_TOKEN environment variable not set"
        print_status "Please make sure you're authenticated with GitHub Packages"
        print_status "You can set GITHUB_TOKEN or use 'npm login --scope=@liangk --registry=https://npm.pkg.github.com'"
    fi
    
    # Publish
    if npm publish; then
        print_success "Package published successfully!"
        print_success "Install with: npm install @liangk/lite-form@$NEW_VERSION"
        
        # Go back to root and create git tag
        cd ../../
        print_status "Creating git tag v$NEW_VERSION..."
        git tag -a "v$NEW_VERSION" -m "Release version $NEW_VERSION"
        
        read -p "Push tag to origin? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git push origin "v$NEW_VERSION"
            print_success "Tag pushed to origin"
        fi
    else
        print_error "Failed to publish package"
        exit 1
    fi
else
    print_status "Package not published. Tarball is available at: dist/lite-form/$TARBALL_NAME"
fi

print_success "Build and publish script completed!"
