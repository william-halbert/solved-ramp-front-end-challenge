/*

I solved the URL Capture The Flag in Python:

##get HTML Text
from temp import text  # import the HTML text from a module called temp

url=""  # initialize an empty string to store the extracted URL

##separate class and value

# iterate through the text character by character
for i in range(0,len(text)):
    
    # define a substring of text that is the maximum 1000 characters prior to the current character
    start_pos = max(0, i - 1000)
    previous_substring = text[start_pos:i]
    
    # count the number of opening section tags in the previous substring
    section_count = previous_substring.count("<section")
    
    # define a smaller substring of text that is the maximum 4 characters prior to the current character
    start_pos = max(0, i - 4)
    prev = text[start_pos:i]
    
    j=0  # initialize a counter variable
    cont=False  # initialize a Boolean variable to control the while loop below
    
    if section_count>0:  # if there is at least one section tag in the previous substring:
        
        ##get the slice to the section opening tag
        while (cont==False):  # loop until the section opening tag is found
            j+=1  # increment the counter
            if (prev.count("<section")==0):  # if the opening tag has not been found:
                prev = text[(start_pos-j):i]  # redefine the previous substring with one more character included
            else:  # if the opening tag has been found:
                cont=True  # set the Boolean variable to exit the while loop
        
        ## make sure section, main, and article are open
        # count the number of opening and closing tags for article, main, and section
        if (prev.count("<article")>prev.count("</article")
            and  prev.count("<main")>prev.count("</main")
            and prev.count("<section")>prev.count("</section") ):
            
            # if the substring contains "flag", extract the URL
            if (text[i-14]=="p" and text[i]=="f" and text[i+1]=="l" and text[i+2]=="a" and text[i+3]=="g"):
                url+=text[i+13]  # append the 14th character after "flag" to the URL string
    
print(url)  # print the extracted URL




*/
