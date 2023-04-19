print("testeinbruch")
print("over router")
print("")
if params.len  != 2 or params[0] == "-h" or params[0] == "--help" then exit("<b>Usage: "+program_path.split("/")[-1]+" [ip_address] [port]</b>")

metaxploit = include_lib("/lib/metaxploit.so")
if not metaxploit then
    metaxploit = include_lib(current_path + "/metaxploit.so")
end if
if not metaxploit then exit("Error: Can't find metaxploit library in the /lib path or the current folder")
address = params[0]
port = params[1].to_int
net_session = metaxploit.net_use( address, port )
if not net_session then exit("Error: can't connect to net session")
metaLib = net_session.dump_lib
focuseup = metaLib.overflow("0x52CAA9AC","focuseup","10.0.12.1")//sultcompre heady focuseup
if typeof(focuseup) == "shell" then print("jop") else print("nope")


//focuseup will lan ip
//heady will im selben netz sein
//sultcompre deaktiviert firewall