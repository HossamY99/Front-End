# Front-End
A web app that fetches random photos from xkcd api and keeps tab of 
the photos viewed by storing them on local storage.  Considering it was a small web-app, most of my functions are in App.js. However, given more complexity, I would definitely split the web-app into more components.
# Technologies Used
React and Node JS.
# Screenshots
This is the homepage of the web-app.It fetches a random image using xkcd api, and displays it. It also fetches the image that is right before it and right after it and 
stores their details, this is to enable the user to move on to the next/previous image quickly without having to wait for the api call. 

![image](https://user-images.githubusercontent.com/67632151/163388770-d36ded79-4bd2-45cb-9a7b-a42b077166e6.png)

Items are interactive and have effects when hovered on. If the image takes some time to load, the user would be presented with a loading animation while the next image loads.

![image](https://user-images.githubusercontent.com/67632151/163389220-d16db630-127a-45db-9b2a-33b741ce1cb6.png)
![image](https://user-images.githubusercontent.com/67632151/163389369-6f78cd98-4f86-4667-8b05-7a9685f1c357.png)

Whenever the user views a meme, the table updates with the title of the meme and the time he/she saw it at. It implements a scroll bar as it can become large in size. The table entries are stored in a map where the key is the title
to enable a quick check if the user has seen this meme or not (O(1)). 
The table also contains a button next to each entry that stores its image's url, so when the user presses on the view button, he is again presented with the appropriate image and title.

![image](https://user-images.githubusercontent.com/67632151/163389433-7714eca4-5be7-4215-adc6-6b11f2e7ceee.png)

