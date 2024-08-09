[CmdletBinding()]
Param
    (
    [Parameter(Mandatory=$true,ValueFromPipeline=$true,HelpMessage="Unique filename prefix:")]
    [System.String]
    $newunique,
    
    [Parameter(Mandatory=$true,ValueFromPipeline=$true,HelpMessage="Display Name:")]
    [System.String]
    $Display_Name,

    [Parameter(Mandatory=$true,ValueFromPipeline=$true,HelpMessage="Type")]
    [ValidateSet("members","wearables","specials","uniques")]
    [System.String]
    $rootfolder,

    [Parameter(Mandatory=$false,ValueFromPipeline=$true,HelpMessage="Skin size")]
    [ValidateSet("large","small")]
    [System.String]
    $Skin_Size,

    [Parameter(Mandatory=$false,ValueFromPipeline=$true,HelpMessage="GamerTag:")]
    [System.String]
    $Gamertag

    )
 



#######################  Set Variables  ######################


$BPFolder = "behavior_packs\Avatar_Pack_B" # Sub folder name for Behaviour pack
$RPFolder = "resource_packs\Avatar_Pack_R" # Sub-folder name for Resource Pack

####################### No Change Below ######################

$ScriptPath = Get-Location


Switch ($rootfolder) {

 "uniques" {$basetemplate = "bluepresent" }

 "wearables" {$basetemplate = "big_bunny_ears"}

 "specials" {$basetemplate = "ahsokatano" }

 "members" {
    $basetemplate = "tonystar73"
    if ($Gamertag.Length -eq 0) {$Gamertag = Read-Host -Prompt "Gamertag"}    
 }

}

#--- Behaviours ---#

$isHead=""
$isMask=""
if ($rootfolder -eq "members" -or $rootfolder -eq "specials") {
    if ($Skin_Size.Length -eq 0) {$Skin_Size = Read-Host -Prompt "Skin Size (large | small)"}
    
    copy-item "$ScriptPath\$BPFolder\entities\avatars\$($rootfolder)\$($basetemplate)_avatar.json" ("$ScriptPath\$BPFolder\entities\avatars\$($rootfolder)\$($newunique)_avatar.json")C
    copy-item "$ScriptPath\$BPFolder\items\avatars\$($rootfolder)\$($basetemplate)_avatar.json" ("$ScriptPath\$BPFolder\items\avatars\$($rootfolder)\$($newunique)_avatar.json")
    copy-item "$ScriptPath\$BPFolder\loot_tables\avatars\$($rootfolder)\$($basetemplate)_avatar.json" ("$ScriptPath\$BPFolder\loot_tables\avatars\$($rootfolder)\$($newunique)_avatar.json")
    copy-item "$ScriptPath\$BPFolder\recipes\avatars\$($rootfolder)\$($basetemplate)_avatar.json" ("$ScriptPath\$BPFolder\recipes\avatars\$($rootfolder)\$($newunique)_avatar.json")
    copy-item "$ScriptPath\$BPFolder\recipes\masks\$($rootfolder)\$($basetemplate)_mask.json" ("$ScriptPath\$BPFolder\recipes\masks\$($rootfolder)\$($newunique)_mask.json")
    

    (Get-Content "$ScriptPath\$BPFolder\entities\avatars\$($rootfolder)\$($newunique)_avatar.json") -replace $basetemplate, $newunique | out-file -Encoding ASCII $("$ScriptPath\$BPFolder\entities\avatars\$($rootfolder)\$($newunique)_avatar.json") 
    (Get-Content "$ScriptPath\$BPFolder\items\avatars\$($rootfolder)\$($newunique)_avatar.json") -replace $basetemplate, $newunique | out-file -Encoding ASCII $("$ScriptPath\$BPFolder\items\avatars\$($rootfolder)\$($newunique)_avatar.json")
    (Get-Content "$ScriptPath\$BPFolder\loot_tables\avatars\$($rootfolder)\$($newunique)_avatar.json") -replace $basetemplate, $newunique | out-file -Encoding ASCII $("$ScriptPath\$BPFolder\loot_tables\avatars\$($rootfolder)\$($newunique)_avatar.json")
    (Get-Content "$ScriptPath\$BPFolder\recipes\avatars\$($rootfolder)\$($newunique)_avatar.json") -replace $basetemplate, $newunique | out-file -Encoding ASCII $("$ScriptPath\$BPFolder\recipes\avatars\$($rootfolder)\$($newunique)_avatar.json")
    (Get-Content "$ScriptPath\$BPFolder\recipes\masks\$($rootfolder)\$($newunique)_mask.json") -replace $basetemplate, $newunique | out-file -Encoding ASCII $("$ScriptPath\$BPFolder\recipes\masks\$($rootfolder)\$($newunique)_mask.json")
        
    $isHead="_head"
    $isMask="_mask"
}

#and Wearables
if ($rootfolder -eq "members" -or $rootfolder -eq "specials" -or $rootfolder -eq "wearables") {
    copy-item "$ScriptPath\$BPFolder\items\masks\$($rootfolder)\$($basetemplate)$($isMask).json" ("$ScriptPath\$BPFolder\items\masks\$($rootfolder)\$($newunique)$($isMask).json")
    (Get-Content "$ScriptPath\$BPFolder\items\masks\$($rootfolder)\$($newunique)$($isMask).json") -replace $basetemplate, $newunique | out-file -Encoding ASCII $("$ScriptPath\$BPFolder\items\masks\$($rootfolder)\$($newunique)$($isMask).json")
}

#and Uniques
if ($rootfolder -eq "members" -or $rootfolder -eq "specials" -or $rootfolder -eq "uniques") {
    copy-item "$ScriptPath\$BPFolder\entities\heads\$($rootfolder)\$($basetemplate)$($isHead).json" ("$ScriptPath\$BPFolder\entities\heads\$($rootfolder)\$($newunique)$($isHead).json")
    copy-item "$ScriptPath\$BPFolder\items\heads\$($rootfolder)\$($basetemplate)$($isHead).json" ("$ScriptPath\$BPFolder\items\heads\$($rootfolder)\$($newunique)$($isHead).json")
    copy-item "$ScriptPath\$BPFolder\loot_tables\heads\$($rootfolder)\$($basetemplate)$($isHead).json" ("$ScriptPath\$BPFolder\loot_tables\heads\$($rootfolder)\$($newunique)$($isHead).json")


    (Get-Content "$ScriptPath\$BPFolder\entities\heads\$($rootfolder)\$($newunique)$($isHead).json") -replace $basetemplate, $newunique | out-file -Encoding ASCII $("$ScriptPath\$BPFolder\entities\heads\$($rootfolder)\$($newunique)$($isHead).json")
    (Get-Content "$ScriptPath\$BPFolder\items\heads\$($rootfolder)\$($newunique)$($isHead).json") -replace $basetemplate, $newunique | out-file -Encoding ASCII $("$ScriptPath\$BPFolder\items\heads\$($rootfolder)\$($newunique)$($isHead).json")
    (Get-Content "$ScriptPath\$BPFolder\loot_tables\heads\$($rootfolder)\$($newunique)$($isHead).json") -replace $basetemplate, $newunique | out-file -Encoding ASCII $("$ScriptPath\$BPFolder\loot_tables\heads\$($rootfolder)\$($newunique)$($isHead).json")
   
}    




#--- Resources ---#


if ($rootfolder -eq "members" -or $rootfolder -eq "specials") {

    copy-item "$ScriptPath\$RPFolder\entity\avatars\$($rootfolder)\$($basetemplate)_avatar.json" ("$ScriptPath\$RPFolder\entity\avatars\$($rootfolder)\$($newunique)_avatar.json")
                                                              
    (Get-Content "$ScriptPath\$RPFolder\entity\avatars\$($rootfolder)\$($newunique)_avatar.json") -replace $basetemplate, $newunique | out-file -Encoding ASCII $("$ScriptPath\$RPFolder\entity\avatars\$($rootfolder)\$($newunique)_avatar.json")
    (Get-Content "$ScriptPath\$RPFolder\entity\avatars\$($rootfolder)\$($newunique)_avatar.json") -replace 'variable.style = 0', 'variable.style = $Skin_size_int' | out-file -Encoding ASCII $("$ScriptPath\$RPFolder\entity\avatars\$($rootfolder)\$($newunique)_avatar.json")

}

     
#and Wearables

if ($rootfolder -eq "members" -or $rootfolder -eq "specials" -or $rootfolder -eq "wearables") {
    copy-item "$ScriptPath\$RPFolder\attachables\masks\$($rootfolder)\$($basetemplate)$($isMask).json" ("$ScriptPath\$RPFolder\attachables\masks\$($rootfolder)\$($newunique)$($isMask).json")
    (Get-Content "$ScriptPath\$RPFolder\attachables\masks\$($rootfolder)\$($newunique)$($isMask).json") -replace $basetemplate, $newunique | out-file -Encoding ASCII $("$ScriptPath\$RPFolder\attachables\masks\$($rootfolder)\$($newunique)$($isMask).json")
}


#and Uniques
if ($rootfolder -eq "members" -or $rootfolder -eq "specials" -or $rootfolder -eq "uniques") {
    
    copy-item "$ScriptPath\$RPFolder\entity\heads\$($rootfolder)\$($basetemplate)$($isHead).json" ("$ScriptPath\$RPFolder\entity\heads\$($rootfolder)\$($newunique)$($isHead).json")
    (Get-Content "$ScriptPath\$RPFolder\entity\heads\$($rootfolder)\$($newunique)$($isHead).json") -replace $basetemplate, $newunique | out-file -Encoding ASCII $("$ScriptPath\$RPFolder\entity\heads\$($rootfolder)\$($newunique)$($isHead).json")
}


if ($rootfolder -eq "members") {
    # --- Function ---
    '' | out-file -Encoding ASCII $ScriptPath\$BPFolder\functions\players.mcfunction -Append
    'give @s[name="' + $Gamertag + '"] athos_avatars:' + $newunique + '_head_item' | out-file -Encoding ASCII $ScriptPath\$BPFolder\functions\players.mcfunction -Append
}






#--- Lang files ---#

'' | out-file -Encoding ASCII $ScriptPath\$RPFolder\texts\EN_GB.lang -Append


if ($rootfolder -eq "members" -or $rootfolder -eq "specials" -or $rootfolder -eq "uniques") {

    'action.hint.exit.athos_avatars:' + $newunique + '_head=Jump to Exit' | out-file -Encoding ASCII $ScriptPath\$RPFolder\texts\en_GB.lang -Append
}
if ($rootfolder -eq "members" -or $rootfolder -eq "specials") {

    'entity.athos_avatars:' + $newunique + '_avatar.name=' + $Display_Name +"'" + 's Avatar' | out-file -Encoding ASCII $ScriptPath\$RPFolder\texts\en_GB.lang -Append
    'entity.athos_avatars:' + $newunique + '_head.name=' + $Display_Name +"'" + 's Head' | out-file -Encoding ASCII $ScriptPath\$RPFolder\texts\en_GB.lang -Append
    'item.athos_avatars:' + $newunique + '_avatar_item=' + $Display_Name +"'" + 's  Avatar' | out-file -Encoding ASCII $ScriptPath\$RPFolder\texts\en_GB.lang -Append
    'item.athos_avatars:' + $newunique + '_head_item=' + $Display_Name +"'" + 's  Head' | out-file -Encoding ASCII $ScriptPath\$RPFolder\texts\en_GB.lang -Append
    'item.athos_avatars:' + $newunique + '_mask=' + $isWearable + $Display_Name +"'" + 's  Mask' | out-file -Encoding ASCII $ScriptPath\$RPFolder\texts\en_GB.lang -Append

}

#or Wearables
if ($rootfolder -eq "wearables") {
    'item.athos_avatars:' + $newunique + '_mask=[Athos] ' + $Display_Name | out-file -Encoding ASCII $ScriptPath\$RPFolder\texts\en_GB.lang -Append
}

#or Uniques
if ($rootfolder -eq "uniques") {
    'item.athos_avatars:' + $newunique + '_item=[Athos] ' + $Display_Name | out-file -Encoding ASCII $ScriptPath\$RPFolder\texts\en_GB.lang -Append
    'entity.athos_avatars:' + $newunique + '.name=' + $Display_Name  | out-file -Encoding ASCII $ScriptPath\$RPFolder\texts\en_GB.lang -Append
}


copy-item "$ScriptPath\$RPFolder\texts\en_GB.lang" "$ScriptPath\$RPFolder\texts\en_US.lang"
copy-item "$ScriptPath\$RPFolder\texts\EN_GB.lang" "$ScriptPath\$RPFolder\texts\sv_SE.lang"



#--- ItemTexture ---#

$ItemTexture = get-content "$ScriptPath\$RPFolder\textures\item_texture.json" -raw | ConvertFrom-Json

if ($rootfolder -eq "members" -or $rootfolder -eq "specials") {
    $ItemTexture.texture_data | Add-Member -NotePropertyName ($newunique + '_avatar_item') -NotePropertyValue @{textures = ('textures/avatars/' + $rootfolder + '/' + $newunique + '/avatar_item')}
}
    $ItemTexture.texture_data | Add-Member -NotePropertyName ($newunique + $isHead + '_item') -NotePropertyValue @{textures = ('textures/avatars/' + $rootfolder+ '/' + $newunique + '/player_head_item')}

$ItemTexture | ConvertTo-Json -Depth 20 | Set-Content "$ScriptPath\$RPFolder\textures\item_texture.json" -Encoding ASCII



#--- Texture List ---

$TextureList =get-content "$ScriptPath\$RPFolder\textures\textures_list.json" -raw | ConvertFrom-Json

    $TextureList +=('textures/avatars/' + $rootfolder + '/' + $newunique + '/player_head_item')
    $TextureList +=('textures/avatars/' + $rootfolder + '/' + $newunique + '/skin1')

if ($rootfolder -eq "members" -or $rootfolder -eq "specials") {
    $TextureList +=('textures/avatars/' + $rootfolder + '/' + $newunique + '/avatar_item')
    $TextureList +=('textures/avatars/' + $rootfolder + '/' + $newunique + '/skin2')
    $TextureList +=('textures/avatars/' + $rootfolder + '/' + $newunique + '/skin3')
}
$TextureList | ConvertTo-Json -Depth 20 | Set-Content "$ScriptPath\$RPFolder\textures\textures_list.json" -Encoding ASCII



#Create Folder and files for Textures

New-Item -ItemType "directory" -Path "$ScriptPath\$RPFolder\textures\avatars\$($rootfolder)\$newunique"

if ($Skin_Size -eq "small") {
    $defaultname = "default_alex"
} else {
    $defaultname = "default_steve"
}

copy-item "$ScriptPath\$RPFolder\textures\$defaultname\player_head_item.png" "$ScriptPath\$RPFolder\textures\avatars\$($rootfolder)\$newunique\player_head_item.png"
copy-item "$ScriptPath\$RPFolder\textures\$defaultname\skin1.png" "$ScriptPath\$RPFolder\textures\avatars\$($rootfolder)\$newunique\skin1.png"

if ($rootfolder -eq "members" -or $rootfolder -eq "specials") {
    copy-item "$ScriptPath\$RPFolder\textures\$defaultname\avatar_item.png" "$ScriptPath\$RPFolder\textures\avatars\$($rootfolder)\$newunique\avatar_item.png"
    copy-item "$ScriptPath\$RPFolder\textures\$defaultname\skin2.png" "$ScriptPath\$RPFolder\textures\avatars\$($rootfolder)\$newunique\skin2.png"
    copy-item "$ScriptPath\$RPFolder\textures\$defaultname\skin3.png" "$ScriptPath\$RPFolder\textures\avatars\$($rootfolder)\$newunique\skin3.png"
}

