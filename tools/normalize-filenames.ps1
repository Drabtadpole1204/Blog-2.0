<#
 normalize-filenames.ps1

 Uso: execute este script no diretório raiz do projeto (onde está o index.html).
 Ele renomeia arquivos dentro de `PNG/` e `Músicas/` para nomes normalizados
 (minúsculas, hífens ao invés de espaços, sem acentos) e substitui referências
 correspondentes em arquivos de texto (.html, .js, .css).

 Atenção: faça um backup ou commit antes de rodar.
#>

Set-StrictMode -Version Latest

function Normalize-Name([string]$name){
    # remove extensão temporariamente
    $ext = [IO.Path]::GetExtension($name)
    $base = [IO.Path]::GetFileNameWithoutExtension($name)
    # remove diacríticos
    $normalized = $base.Normalize([Text.NormalizationForm]::FormD) -replace '\p{Mn}',''
    $normalized = $normalized.ToLower()
    # replace spaces and forbidden chars with '-'
    $normalized = $normalized -replace '[^a-z0-9]','-'
    $normalized = $normalized -replace '-+','-'
    $normalized = $normalized.Trim('-')
    if([string]::IsNullOrWhiteSpace($normalized)){
        $normalized = 'file'
    }
    return "$normalized$ext"
}

function Process-Folder([string]$folder){
    if(-not (Test-Path $folder)) { Write-Host "Pasta $folder não encontrada, pulando."; return @() }
    $changes = @()
    Get-ChildItem -LiteralPath $folder -File | ForEach-Object {
        $old = $_.Name
        $new = Normalize-Name($old)
        if($old -ne $new){
            $oldPath = Join-Path $folder $old
            $newPath = Join-Path $folder $new
            if(Test-Path $newPath){
                Write-Host "Aviso: destino já existe: $newPath -> pulando renomeação de $old"
            } else {
                Write-Host "Renomeando: $old -> $new"
                Rename-Item -LiteralPath $oldPath -NewName $new
                $changes += @{old = "$folder/$old"; new = "$folder/$new"}
            }
        }
    }
    return $changes
}

function Replace-In-Files([array]$mappings){
    $exts = @('*.html','*.htm','*.js','*.css')
    $files = foreach($e in $exts){ Get-ChildItem -Recurse -File -Include $e }
    foreach($map in $mappings){
        $old = $map.old -replace '\\','/'
        $new = $map.new -replace '\\','/'
        foreach($f in $files){
            (Get-Content -Raw -LiteralPath $f.FullName) -replace [Regex]::Escape($old), $new | Set-Content -LiteralPath $f.FullName
        }
    }
}

Push-Location -LiteralPath (Get-Location)
try{
    Write-Host "== Normalizando arquivos em PNG/ e Músicas/ =="
    $mapAll = @()
    $mapAll += Process-Folder -folder "PNG"
    $mapAll += Process-Folder -folder "Músicas"

    if($mapAll.Count -gt 0){
        Write-Host "Substituindo referências em arquivos de texto..."
        Replace-In-Files -mappings $mapAll
        Write-Host "Feito. Revise as alterações e faça commit se estiver satisfeito."
        $mapAll | Format-Table -AutoSize
    } else {
        Write-Host "Nenhuma renomeação necessária."
    }
} finally {
    Pop-Location
}
