---
title: "'Hacking' the Wifi captive portal (Part 1)"
date: '2022-06-20'
tags: ['wifi', 'iot', 'esp32']
draft: false
summary: Login to Wifi captive portal the unusual ways
---

When building IoT projects, the quickest way is to connect them to our mobile hotspot. But, to some extent. What if we want the project to be deployed somewhere else? For sure, it is not very convenient to put our phones together with the project. In my case, when we want to deploy [the Parcel Safety Box project](../projects/), the only public wifi available is the campus wifi.

However, it is not straightforward as plugging the SSID and password of the Wifi network. Campus wifi usually has another layer of authentication called a captive portal. According to [techtarget.com](https://www.techtarget.com/searchmobilecomputing/definition/captive-portal), **captive portal a web page that the user of a public-access network is obliged to view and interact with before access is granted**. The example below is the captive portal of my campus wifi: `IIUM-Student`.

![IIUM-Student-Captive-Portal](/static/blog/hack-wifi/wifiportal.png)

While there is no problem logging into the wifi network when you have a laptop or phone. But, we are now talking about edge devices, such as [**microcontrollers**](https://www.espressif.com/en/products/socs/esp32). It doesn't have a GUI environment, let alone a web browser to access the portal. After some attempts with a different approach, I found a way to authenticate ourselves to the wifi without a web browser.

We are going to use ESP32 microcontroller throughout this article

## Spoofing the MAC address

The first approach I tried to make my ESP32 act as it is my laptop. Found this Reddit [answers'](https://www.reddit.com/r/esp32/comments/eyrelc/comment/fgiw1en/?utm_source=share&utm_medium=web2x&context=3) and I think it is theoretically possible.

A MAC address, or **Media Access Control** address, is a unique 12-digit hexadecimal number used to identify a physical device within a network. For example, the MAC address will look something like this: `31-15-EA-C8-56-FA`. A laptop, a phone, and someone else phone should have a different MAC address.

The wifi access point (AP) will interact with devices using this MAC address (in addition to IP addresses etc.). So, if I try to set the ESP32's MAC address to be the same as my logged-in device, the ESP32 can access the network, right? But, for some reason, that's not the case. **Nothing works**. I'm not sure if I'm missing something.

## Making an HTTP request to the captive portal server

Moving on to the second approach,
