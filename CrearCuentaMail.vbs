Dim obApp
Set obApp = CreateObject("hMailServer.Application")

' Authenticate. Without doing this, we won't have permission
' to change any server settings or add any objects to the
' installation.   
Call obApp.Authenticate("Administrator", "")

' Locate the domain we want to add the account to
Dim obDomain
Set obDomain = obApp.Domains.ItemByName("adriannet.local")

Dim obAccount
Set obAccount = obDomain.Accounts.Add

' Set the account properties
obAccount.Address = WScript.Arguments(0) & "@adriannet.local"
obAccount.Password = WScript.Arguments(1)
obAccount.Active = True
obAccount.MaxSize = 0

obAccount.Save