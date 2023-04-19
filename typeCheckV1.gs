print("TypeCheckerV1")
print("what kind of types the exploits are")
print("")

metaxploit = include_lib("/lib/metaxploit.so")
if not metaxploit then
    metaxploit = include_lib(current_path + "/metaxploit.so")
end if
if not metaxploit then exit("Error: Can't find metaxploit library in the /lib path or the current folder")
libanswer = user_input("Which lib is it? ->")
metalib = ("/home/Scy/LibLabor/"+ libanswer)
print(metalib)
hashes = []
keywords = []
goOn = "x"
while goOn != "n"
hashAnswer = user_input("Give hash>")
keyAnswer = user_input("Give Answer>")
goOn = user_input("Ne(x)t?Or do(n)e?>")
hashes.push(hashAnswer)
keywords.push(keyAnswer)
print("You have " + hashes.len + " Entries.")
end while

i = 0 
while i < hashes.len
print("Hash -> " + hashes[i] + " Keyword-> " + keywords[i])
i = i+ 1
end while
print("thats it for now")
//focuseup = metaLib.overflow("0x52CAA9AC","focuseup","10.0.12.1")//sultcompre heady focuseup
//if typeof(focuseup) == "shell" then print("jop") else print("nope")
// j = 0
//while j < hashes.len
current = metalib.overflow("0x52CAA9AC","heady")
print("-----")
//print("Hash nr. is a " + typeof(current))
print("-----")
//j = j + 1
//end while
print("Program ended.")

 
