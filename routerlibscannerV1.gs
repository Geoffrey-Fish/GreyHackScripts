print("Shenannigan v1.2")
print("httpexploit for gaining access to router via http")
print("scan library of router for vulnerabilities")
if params.len  != 2 or params[0] == "-h" or params[0] == "--help" then exit("<b>Usage: "+program_path.split("/")[-1]+" [ip_address] [port]</b>")

metaxploit = include_lib("/lib/metaxploit.so")
if not metaxploit then
    metaxploit = include_lib(current_path + "/metaxploit.so")
end if
if not metaxploit then exit("Error: Can't find metaxploit library in the /lib path or the current folder")
address = params[0]
port = params[1].to_int
net_session = metaxploit.net_use( address)
if not net_session then exit("Error: can't connect to net session")
targetlib = net_session.dump_lib
print("The Targetlib has version: " + targetlib.version)
if targetlib != null then
scanlibr = metaxploit.scan(targetlib)
else 
exit("targetlib didnt work")
end if
print("The memoryadress is: " + scanlibr)
addr = scanlibr[0]
print("Testprint addr: " + addr)
scanlibraddr = metaxploit.scan_address(targetlib, addr)
if not scanlibraddr then exit("Error. At least scanlibr worked")
print(scanlibraddr)
print("thats it!")
exit