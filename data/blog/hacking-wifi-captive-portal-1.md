---
title: "'Hacking' the Wifi captive portal (Part 1)"
date: '2022-07-5'
tags: ['wifi', 'iot', 'esp32']
draft: false
summary: Login to Wifi captive portal the unusual ways
---

When building IoT projects, the quickest way is to connect them to our mobile hotspot. But, to some extent. What if we want the project to be deployed somewhere else? For sure, it is not very convenient to put our phones together with the project. In my case, when we want to deploy [the Parcel Safety Box project](../projects/), the only public wifi available is the campus wifi.

Heads up, this article is not about actually hacking the portal, i.e., bypassing the security etc. You'll still need your username & password or any other valid credentials.

It is not straightforward as plugging the SSID and password of the campus Wifi network. They usually have another layer of authentication called a captive portal. According to [techtarget.com](https://www.techtarget.com/searchmobilecomputing/definition/captive-portal), **captive portal a web page that the user of a public-access network is obliged to view and interact with before access is granted**. The example below is the captive portal of my campus wifi: `IIUM-Student`.

![IIUM-Student-Captive-Portal](/static/blog/hack-wifi/wifiportal.png)

While there is no problem logging into the wifi network when you have a laptop or phone, [**microcontrollers**](https://www.espressif.com/en/products/socs/esp32), on the other hand, are a different story. It doesn't have a GUI environment, let alone a web browser to access the portal. After some attempts with a different approach, I found a way to authenticate ourselves to the wifi without a web browser.

We are going to use the ESP32 microcontroller throughout this article

## Spoofing the MAC address

The first approach I tried was making my ESP32 act as my laptop. Found this Reddit [answers'](https://www.reddit.com/r/esp32/comments/eyrelc/comment/fgiw1en/?utm_source=share&utm_medium=web2x&context=3) and I think it is theoretically possible.

A MAC address, or **Media Access Control** address, is a unique 12-digit hexadecimal number used to identify a physical device within a network. For example, the MAC address will look something like this: `31-15-EA-C8-56-FA`. A laptop, a phone, and someone else phone should have a different MAC address.

The wifi access point (AP) will interact with devices using this MAC address (in addition to IP addresses etc.). So, if I try to set the ESP32's MAC address to be the same as my logged-in device, the ESP32 can access the network, right? But, for some reason, that's not the case. **Nothing works**. I'm not sure if I'm missing something.

## Making an HTTP request to the captive portal server

Moving on to the second approach (_spoiler alert: **It works!**_), is to capture what the captive portal does behind the scenes and try to replicate those in the microcontroller.

I'm going to record my methodology in the steps below. If you're a bit impatient 🤭, you can skip to the solution [here](#results).

### Connect to Wifi

Connect to your campus/hotel/community wifi using a laptop or PC. The captive portal will open automatically. If it doesn't, the system usually prompt you to sign in first to use the network. If the system didn't give you a prompt, launch your browser and open http://neverssl.com. Then, the wifi's captive portal should appear.

### Prepare browser

Open the Developer Tools (or press F12) and go to the **Network** tab. Click the **Record network log** if it doesn't recording yet. Then, check the option **Preserve log**, so the network log doesn't disappear even when the traffic redirects.

_Here I use Microsoft Edge. Any other chromium-based browser should work very similarly._

![Browser's Network tab F12](/static/blog/hack-wifi/f12-console.png)

### Login

Next, enter your `username` and `password`. Then, click the **login** button.

_Note that, some wifi requires you to register as a guest, and usually, the session will be timed_

![Login iium wifi](/static/blog/hack-wifi/cp-login.png)

After that, on some wifi, you'll be redirected to some website, indicating that your login was successful and you can now access the Internet.

### Playing detective

Now, check the Network tab we've opened earlier. As you've noticed, there is a lot of network traffic being recorded. We need to inspect which request authenticates us when we click the **login** button earlier.

These requests will be likely to occur earlier in the timeline, so scroll up. In the **Name** column, look for something called `login` or something similar.

💡 **Tip:** Look for a `POST` method. But it is not always the case (I think)

![Network activity inspection](/static/blog/hack-wifi/network-login-inspection.png)

Now, we found the best request candidate. We can further confirm it by looking at what this request sent to the server. If it contains your username and password you've entered earlier, then good news, your search is over (hopefully). If it doesn't, look for another request.

Switch to the **Payload** tab.

![Network activity payload data](/static/blog/hack-wifi/network-login-payload.png)

Don't close this tab yet, we going to need it in the next step.

### Testing and verifying

I'll use [Insomnia](https://insomnia.rest/) for this purpose, you can use other API testing software that works **offline**.
Starts by creating a new **Request Collection**, give it any suitable name.

Go back to the Developer Tools window earlier. Right-click the best candidate we've chosen earlier, click on **Copy** and choose **Copy as cURL (Bash)**.

![Network copy as cURL (Bash)](/static/blog/hack-wifi/copy-as-curl-bash.png)

In Insomnia, create a **New Request**, then paste in the empty text box to import the cURL command we've copied earlier. The request body should be automatically parsed. _For other software, look for option import from cURL or similar_

![Insomnia paste cURL](/static/blog/hack-wifi/insomnia-paste.png)

⚠️ Attention: Some characters are automatically url-encoded after pasting. Be sure to change it to normal text. Example: Your password is `s@ample`, but in insomnia, it becomes `s%40mple`. Be sure to edit it to become the original text.

To test it, **logout** from the network, perhaps by clicking the logout button (if available), or by disconnecting and connecting back to the wifi (not sure if this can work). _You might need to change the site's permission to allow **Pop-ups**_

![Captive portal logout](/static/blog/hack-wifi/cp-logout.png)

For **IIUM-Student** wifi, go to this link from the Insomnia or the browser: `https://captiveportalgombak1.iium.edu.my/cgi-bin/login?cmd=logout`

Now, back in the Insomnia, click the **Send** button. After a few seconds, the server will send a response. It is `200` or `OK` for successful requests. You can now check if the Internet can be accessed.

![Insomnia Success 200 OK](/static/blog/hack-wifi/insomnia-success-200.png)

### Tuning

Remember that our main purpose is to implement this login method to the microcontrollers. So, we need to cut down the unnecessary data to reduce the memory footprint for the mcu's cpu.

Start by using the **trial and error** method to turn one parameter off and test the POST request. If the request is successful, that indicates that the parameter is safe to be turned off. Then repeat with other paramaters.

ℹ️ **Info:** **"Turning off"** here means the parameter is not sent to the server.

I discovered that the `url` parameter can be safely turned off. All the headers also are not necessary.

![Insomnia unchecked parameter](/static/blog/hack-wifi/insomnia-disable-url.png)

![Insomnia unchecked all headers](/static/blog/hack-wifi/insomnia-disable-headers.png)
