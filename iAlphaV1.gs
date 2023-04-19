print("Ialpha rootpassword changer")
print("on target machine to ""bob""")

metax = include_lib("/lib/metaxploit.so")
adress = user_input("Adress: ")
port = user_input("Port: ").to_int
print("start connection...")
getlib = metax.net_use(adress,port)
metalib = getlib.dump_lib

test = metalib.overflow("0x1664B3FD","ialpha","bob")
if not test then exit("something did not work out")

print("Success.Root password is now ""bob""")
