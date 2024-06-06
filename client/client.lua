QBCore = exports['qb-core']:GetCoreObject()

function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
end


local function OpenBook(bookName) 
  toggleNuiFrame(true)
  SendReactMessage("setBookName", bookName)
end

RegisterNetEvent('bookmaster:client:openBook', OpenBook)

RegisterCommand('openBook', function()
  OpenBook('garbage')
end)

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('Hide NUI frame')
  cb({})
end)

-- RegisterNUICallback('getClientData', function(data, cb)
--   debugPrint('Data sent by React', json.encode(data))


-- -- Lets send back client coords to the React frame for use
--   local curCoords = GetEntityCoords(PlayerPedId())

--   local retData = { x = curCoords.x, y = curCoords.y, z = curCoords.z }
--   cb(retData)
-- end)


