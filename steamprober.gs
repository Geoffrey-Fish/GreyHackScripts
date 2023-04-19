//Beginner Probe		file: bprobe

print("<b>-= Beginner Probe 1.0 =-</b>")
if params.len != 5 then
	if params.len != 4 or params[0] == "-h" or params[0] == "--help" then exit("<b>Usage: bprobe [ip_address] [port] [memory] [exploit] (password)</b>\n<b>Description:</b>\nScript to use external exploits.\nby IZackI")
end if

metaxploit = include_lib("/lib/metaxploit.so")
if not metaxploit then exit("<color=#ff0000>Error: Unable to find 'metaxploit.so'. Put missing library in the 'lib' folder.</color>")
decipherFile = get_shell.host_computer.File("/bin/decipher")
if not metaxploit then exit("<color=#ff0000>Error: Unable to find 'decipher'. Put missing program in the 'bin' folder.</color>")

address = params[0]
port = params[1].to_int
memory = params[2]
exploit = params[3]
if params.len == 5 then		// check if parameter 5 was provided
	newPass = params[4]
else
	newPass = null
end if

net_session = metaxploit.net_use(address, port)
if not net_session then exit("<color=#ff0000>Error: Unable to connect.</color>")
print("-- Probe --")
metaLib = net_session.dump_lib
if newPass == null then		// if parameter 5 is not empty
	result = metaLib.overflow(memory, exploit)		// performs a buffer overflow attack 
else
	result = metaLib.overflow(memory, exploit, newPass)		// performs a buffer overflow attack to change password
	if result then	print("<b>New password: "+newPass+"</b>")		// prints new password
end if

if result != null then
	type = typeof(result)		// var type is the type of var result
	if type != "shell" and type != "file" then exit("<color=#ff0000>Error: This type is not supported.</color>")		// if type is not equal to 'shell' and 'file' then exit
	if type == "shell" then result.start_terminal		// if type is shell open terminal
	if type == "computer" then		// if type is computer
		passFile = result.File("/etc/passwd")		// reads content of the file and sets it in passFile var 
		if not passFile then exit("Password file is missing.")		// if passFile is empty exit
		if passFile.has_permission("r") then		// check permission of passFile
			if passFile == null then exit("Password file is empty.")		// checks if the passFile is empty
			fileLocation = "/home/"+active_user		// sets var fileLocation to '/home/user_directory'
			createFile = get_shell.host_computer.File(fileLocation+"/receivedPaswd.txt")		// checks if receivedPaswd.txt file exist
			if createFile then createFile.delete		// if old file exist delete it
			get_shell.host_computer.touch(fileLocation, "receivedPaswd.txt")		// creates empty file named 'receivedPaswd.txt' in the user directory
			get_shell.host_computer.File(fileLocation+"/receivedPaswd.txt").set_content(result.File("/etc/passwd").content)		// copies content of '/etc/passwd' to 'receivedPaswd.txt'
			createFile = get_shell.host_computer.File(fileLocation+"/receivedPaswd.txt")
		else
			exit("Unable to access password file")		// if no permission to read file '/etc/passwd'
		end if
		if createFile == null then		// if created file is empty remove file and exit
			createFile.delete
			exit("Downloaded password file is empty.")
		end if
		while true		// loop while - this loop will never end, until user selects 0, 1 or 2
			print("Option: ")
			print("1. Decipher")
			print("2. Remove file with passwords")
			print("0. Exit")
			opt = user_input("Option: ")		// this is user option - it waits for user input and stores this value in opt var
			if opt == "0" then exit("-- Done --")		// if user entered '0' exit
			if opt == "1" then		// if user entered '1'
				get_shell.launch("/bin/decipher", fileLocation+"/receivedPaswd.txt")		// execute program '/bin/decipher' with parameter
			end if
			if opt == "2" then		// if user entered '2'
				if createFile then createFile.delete		// checks if createFile exist and delete it
				exit("File: 'receivedPaswd.txt' was removed.")
			end if
		end while
	end if
else
	exit("-- Probe Failed --")
end if