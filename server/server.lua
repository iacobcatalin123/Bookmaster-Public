QBCore = exports['qb-core']:GetCoreObject()

RegisterNetEvent("bookmaster:server:testPassed", function (bookName, skillLevel)
   local src = source
   local Player = QBCore.Functions.GetPlayer(src)
   local PlayerData = Player.PlayerData

   local citizenid = PlayerData.citizenid

   MySQL.insert('INSERT IGNORE INTO bookmaster (citizenId, bookName, skillLevel) VALUES (?, ?, ?)', {
      citizenid,
      bookName,
      skillLevel
   })

   print("Player " .. citizenid .. " has passed the test for " .. bookName .. " with a skill level of " .. skillLevel)

end)


function getPlayerSkillLevel(playerSource, skillName) 
   local src = playerSource
   local Player = QBCore.Functions.GetPlayer(src)
   local PlayerData = Player.PlayerData

   local citizenid = PlayerData.citizenid

   local result = MySQL.Sync.fetchAll('SELECT skillLevel FROM bookmaster WHERE citizenId = ? AND bookName = ? ', {
      citizenid,
      skillName
   })
   
   -- handle errs
   if result[1] == nil then
      return 1.0
   end


   return result[1].skillLevel
end

exports('getPlayerSkillLevel', getPlayerSkillLevel)