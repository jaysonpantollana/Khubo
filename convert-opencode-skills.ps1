# OpenCode to MiMoCode Skill Converter
# Converts OpenCode skills from ~/.config/opencode/skills/ to MiMoCode format in .mimocode/skills/

$sourceDir = "C:\Users\hp\.config\opencode\skills"
$targetDir = "C:\Users\hp\OneDrive\Desktop\khubo\Khubo\.mimocode\skills"

# Create target directory if it doesn't exist
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
}

# Get all skill directories
$skills = Get-ChildItem $sourceDir -Directory
$total = $skills.Count
$converted = 0
$skipped = 0
$errors = 0

Write-Host "Found $total OpenCode skills to convert" -ForegroundColor Cyan

foreach ($skill in $skills) {
    $skillName = $skill.Name
    $skillMdPath = Join-Path $skill.FullName "SKILL.md"
    
    # Skip if no SKILL.md
    if (-not (Test-Path $skillMdPath)) {
        Write-Host "SKIP: $skillName (no SKILL.md)" -ForegroundColor Yellow
        $skipped++
        continue
    }
    
    # Create target skill directory
    $targetSkillDir = Join-Path $targetDir $skillName
    if (-not (Test-Path $targetSkillDir)) {
        New-Item -ItemType Directory -Path $targetSkillDir -Force | Out-Null
    }
    
    # Read source SKILL.md
    $content = Get-Content $skillMdPath -Raw -ErrorAction SilentlyContinue
    if (-not $content) {
        Write-Host "ERROR: $skillName (empty file)" -ForegroundColor Red
        $errors++
        continue
    }
    
    # Parse frontmatter
    $frontmatter = ""
    $body = $content
    
    if ($content -match "^---\r?\n(.*?)\r?\n---\r?\n(.*)$") {
        $frontmatter = $matches[1]
        $body = $matches[2]
    }
    
    # Extract name and description from frontmatter
    $name = $skillName
    $description = ""
    
    if ($frontmatter -match "name:\s*[""']?([^""'\r\n]+)[""']?") {
        $name = $matches[1].Trim()
    }
    
    if ($frontmatter -match "description:\s*[""']?(.*?)[""']?\s*(?:\r?\n|$)") {
        $description = $matches[1].Trim()
    }
    
    # Clean up description - remove quotes if present
    $description = $description.Trim('"', "'")
    
    # If description doesn't start with "Use when", add a generic prefix
    if (-not $description.StartsWith("Use when") -and -not $description.StartsWith("use when")) {
        # Try to infer from content
        $inferredDesc = "Use when working with $skillName"
        if ($body -match "When to Use\s*\n(.+?)(?:\n#|\n---|\Z)") {
            $whenToUse = $matches[1].Trim()
            if ($whenToUse) {
                $inferredDesc = "Use when: $whenToUse"
            }
        }
        $description = $inferredDesc
    }
    
    # Truncate description if too long (max 500 chars)
    if ($description.Length -gt 500) {
        $description = $description.Substring(0, 497) + "..."
    }
    
    # Build new SKILL.md content
    $newContent = @"
---
name: $name
description: "$description"
---

$body
"@
    
    # Write to target
    $targetPath = Join-Path $targetSkillDir "SKILL.md"
    try {
        Set-Content -Path $targetPath -Value $newContent -Encoding UTF8 -ErrorAction Stop
        Write-Host "OK: $skillName" -ForegroundColor Green
        $converted++
    } catch {
        Write-Host "ERROR: $skillName - $_" -ForegroundColor Red
        $errors++
    }
}

Write-Host "`nConversion complete!" -ForegroundColor Cyan
Write-Host "Converted: $converted" -ForegroundColor Green
Write-Host "Skipped: $skipped" -ForegroundColor Yellow
Write-Host "Errors: $errors" -ForegroundColor Red
