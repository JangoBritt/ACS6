[CmdletBinding()]
Param
    (
    [Parameter(Mandatory=$true,ValueFromPipeline=$true,HelpMessage="Unique Skin File Path:")]
    [System.String]
    $Skin_File
    )
 
Install-Module ImagePlayground -Scope CurrentUser

#######################  Set Variables  ######################

$itemImg = Get-Image -FilePath "C:\Users\adam\iCloudDrive\Desktop\Minecraft stuff\Packs\S6\Avatar_Pack_R\textures\default_steve\player_head_item.png"
$avatarImg = Get-Image -FilePath "C:\Users\adam\iCloudDrive\Desktop\Minecraft stuff\Packs\S6\Avatar_Pack_R\textures\default_steve\avatar_item.png"

####################### No Change Below ######################

$ScriptPath = Get-Location

$Rectangle = [SixLabors.ImageSharp.Rectangle]::new(8,8,8,8)
$Rectangle2 = [SixLabors.ImageSharp.Rectangle]::new(40,8,8,8)


try {
    $Head = Get-Image -FilePath $Skin_File
    }
catch {
    exit
}
Save-Image -Image $Head -FilePath $ScriptPath\skin1.png

$Head.Crop($Rectangle2)
Save-Image -Image $Head -FilePath $ScriptPath\head.png

try {
    $Head = Get-Image -FilePath $Skin_File
    }
catch {
    exit
}
$Head.Crop($Rectangle)


$Head.AddImage("$ScriptPath\head.png", 0, 0, 1)
Save-Image -Image $Head -FilePath $ScriptPath\head.png


$itemImg.AddImage("$ScriptPath\head.png", 4, 4, 1)

Save-Image -Image $itemImg -FilePath $ScriptPath\player_head_item.png

$avatarImg.AddImage("$ScriptPath\head.png",4,1,1)
Save-Image -Image $avatarImg -FilePath $ScriptPath\avatar_item.png
Remove-Item -Path $ScriptPath\head.png