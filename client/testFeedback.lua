RegisterNUICallback('getTestResults', function(data, cb)
    local score = data.score
    local totalScore = data.total
    local skillName = data.skillName
    local skillLevel = data.skillLevel

    -- local passingScore = if the guy did 90% correct
    local passingScore = totalScore * 0.9

    local passed = score >= passingScore

    toggleNuiFrame(false)


    if passed then
        TriggerServerEvent("bookmaster:server:testPassed", skillName, skillLevel)
        QBCore.Functions.Notify("You have passed " .. skillName, "primary", 3500)
        return
    end

    QBCore.Functions.Notify("You have failed " .. skillName, "primary", 3500)


end)