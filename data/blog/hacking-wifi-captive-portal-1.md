---
title: "'Hacking' the Wifi captive portal (Part 1)"
date: '2022-06-20'
tags: ['wifi', 'iot', 'esp32']
draft: false
summary: Login to Wifi captive portal the unusual ways
---

When building IoT projects, the quickest way is to connect them to our mobile hotspot. But, to some extent. What if we want the project to be deployed to somewhere else? For sure it is not very convenient to put our phone together with the project. In my cases, when we want to deploy [the Parcel Safety Box project](../projects/), the only public wifi available is the campus wifi.

However, it is not straightforward as plugging the SSID and password of the Wifi network. Campus wifi usually have another layer of authentication called captive portal. According to [techtarget.com](https://www.techtarget.com/searchmobilecomputing/definition/captive-portal), **captive portal a web page that the user of a public-access network is obliged to view and interact with before access is granted**. Example below is the captive portal of my campus wifi: `IIUM-Student`.

There are no problem logging in to the wifi network when you have laptop or phones, but now we are talking about edge devices, such as **microcontrollers**. It doesn't have GUI environement, let alone a web browser to access the portal. After some attempts with different approach, I found one way to authenticate ourselves to the wifi without a web browser.

## Inline Highlighting

Sample of inline highlighting `sum = parseInt(num1) + parseInt(num2)`

## Code Blocks

Some Javascript code

```javascript
var num1, num2, sum
num1 = prompt('Enter first number')
num2 = prompt('Enter second number')
sum = parseInt(num1) + parseInt(num2) // "+" means "add"
alert('Sum = ' + sum) // "+" means combine into a string
```

Some Python code 🐍

```python
def fib():
    a, b = 0, 1
    while True:            # First iteration:
        yield a            # yield 0 to start with and then
        a, b = b, a + b    # a will now be 1, and b will also be 1, (0 + 1)

for index, fibonacci_number in zip(range(10), fib()):
     print('{i:3}: {f:3}'.format(i=index, f=fibonacci_number))
```
