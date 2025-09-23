# Release Process

GitHub release automation

## How to Release

1. **Update version in package.json**:
   ```json
   {
     "version": "X.Y.Z"
   }
   ```

2. **Create and push a git tag**:
   ```bash
   git tag v1.2.3
   git push origin v1.2.3
   ```

3. **Done**
   - GitHub Actions will automatically build the extension
   - Create a release with auto-generated changelog
   - Upload the extension files

## Tag Formats

- **Stable release**: `v1.0.0`, `v1.2.3`
- **Pre-release**: `v1.0.0-beta`, `v1.2.3-rc1` (any tag with `-`)

## Where to Check

- **Actions**: https://github.com/BelianiRafal/Extension-for-Graphics/actions
- **Releases**: https://github.com/BelianiRafal/Extension-for-Graphics/releases