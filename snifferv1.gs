print("Testsniffer for routerv1")
    metax = include_lib("/lib/metaxploit.so")
    target = user_input("Router Adress: ==>")
    router = metax.net_use(target,"0")
    if not router then exit("wrong code? ")
    router.sniffer(1)
    print("Sniffing...")