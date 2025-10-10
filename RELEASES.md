# Release Process

GitHub release automation

## How to Release

### Option A - fastest method, using @stackjs/bumpx

Use one of the following commands:

> **Patch version bump (1.0.0 → 1.0.1)**

```
bumpx patch / bunx bumpx patch
```

> **Minor version bump (1.0.0 → 1.1.0)**

```
bumpx minor / bunx bumpx minor
```

> **Major version bump (1.0.0 → 2.0.0)**

```
bumpx major / bunx bumpx major
```

If you want to create a pre-release version, use `bumpx prerelease / bunx bumpx prerelease`

[bumpx docs](http://bumpx.netlify.app/usage#version-bumping)

### Option B

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

3. **Release in process!**

- GitHub Actions will automatically build the extension
- Create a release with auto-generated changelog
- Upload the extension files

## Tag Formats

- **Stable release**: `v1.0.0`, `v1.2.3`
- **Pre-release**: `v1.0.0-beta`, `v1.2.3-rc1` (any tag with `-`)

## Where to Check

- **Actions**: <https://github.com/BelianiRafal/Extension-for-Graphics/actions>
- **Releases**: <https://github.com/BelianiRafal/Extension-for-Graphics/releases>
