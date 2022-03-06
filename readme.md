# Hackthecat - Better defence through learning offense
Hackthecat is a vulnerable node express/mysql app intended for teaching, demonstrating and practicing common security issues and defensive techniques.

![HackTheCat Logo](web/assets/images/hackTheCatLogo.png?raw=true "HackTheCat Logo")

AppSec is generally not taught well (if at all) and we can write better, more secure applications if we understand the approaches and techniques attackers will use to exploit our solutions. This sample application allows you to play with various offensive techniques and then defend against these attacks. 

This is also a good practice application for those studying for security certifications such as Offensive Security's [OSCP](https://www.offensive-security.com/pwk-oscp/), [AWAE - Advanced Web Attacks and Exploitation](https://www.offensive-security.com/learn-one/awaeoswe/).

## IMPORTANT READ ME FIRST

This application is intended to teach and learn AppSec concepts and deliberately contains many security issues. 

**Under no circumstances should this code be installed on an internet facing or sensitive machine. If an attacker can access this application then it will be very easy for them to gain full access to the machine it is running on and potentially the network it is connected to.**

Do not use offensive techniques against sites or applications you do not have permission to as it is almost certainly illegal and you could end up in a lot of trouble or even jail. 

There are many better legal options to develop your skills including more mature projects such as [OWASPs VWAD](https://owasp.org/www-project-vulnerable-web-applications-directory/) or you could explore some great online services like [Hackthebox](https://www.hackthebox.com/) and [Try Hack Me](https://tryhackme.com/).

This software is licensed under [Creative Commons Attribution-NonCommercial 4.0 International](https://creativecommons.org/licenses/by-nc/4.0/legalcode) and as per this license:

     TO THE EXTENT POSSIBLE, IN NO EVENT WILL THE LICENSOR BE LIABLE
     TO YOU ON ANY LEGAL THEORY (INCLUDING, WITHOUT LIMITATION,
     NEGLIGENCE) OR OTHERWISE FOR ANY DIRECT, SPECIAL, INDIRECT,
     INCIDENTAL, CONSEQUENTIAL, PUNITIVE, EXEMPLARY, OR OTHER LOSSES,
     COSTS, EXPENSES, OR DAMAGES ARISING OUT OF THIS PUBLIC LICENSE OR
     USE OF THE LICENSED MATERIAL, EVEN IF THE LICENSOR HAS BEEN
     ADVISED OF THE POSSIBILITY OF SUCH LOSSES, COSTS, EXPENSES, OR
     DAMAGES. WHERE A LIMITATION OF LIABILITY IS NOT ALLOWED IN FULL OR
     IN PART, THIS LIMITATION MAY NOT APPLY TO YOU.

     The disclaimer of warranties and limitation of liability provided
     above shall be interpreted in a manner that, to the extent
     possible, most closely approximates an absolute disclaimer and
     waiver of all liability.

## Issues 

**Spoiler alert! Skip this section if you want to find the various issues yourself :)**

This sample application contains many issues you can practice exploting and fixing up including:

* XSS (stored and reflected)
* Various SQL Injection issues
* Weak session cookie options
* Weak encoding optipns
* LFI (Local File Inclusion)/RFI (Remote File Inclusion)
* RCE via known vunerable version of node-serialize (0.4)
* RCE via Side Template Injection (SSTI) in vunerable version of pug template engine (2.0.4)
* File upload
* Poor and inconsitently implemented authentication approach 

Found something else? Awesome let me know :)

In the future I plan to add the following:

* Documentation/labs walking through various issues
* Different levels of difficulty e.g. implementing naive and basic XSS filters

## User Details

The database will be default contain two users:

* username: admin, password: pass
* username: user, password: pass

## Pre-Requisites

This application has been tested on Linux (Ubuntu) and Windows 10.

If you are not using the docker images you will need the following installed:

* Node (tested with v16.13.2 Ubuntu)
* MySQL (tested with 8.0.28-0ubuntu0.20.04.3 Ubuntu)

If you want to use Docker well you'll obviously need Docker too and Python as well for some reason I dont understand which I think is used in Docker compose.

## Setup

**IMPORTANT! Again, do not install this application on a internet or sensitive machine as it is very easy to exploit** 

This application is very simple and consists of:

* Node Express App using EJS (template engine)
* MySQL
* Some dubious Node code (I'm a .NET Core kind of guy generally), hacky CSS and HTML I wrote to mangle an existing template into what I wanted

You have two setup options:

* Docker (easiest)
* Manual Setup

If you want to play and experiment with the code Manual setup will be your best option.

### Docker

Linux users will probably need to prefix these commands with `sudo` unless you are running as **root** which you probably should not be..

1. Open a shell and navigate to where the **docker-compose.yaml** file is and run `docker-compose up`
1. Docker will download base images if you dont already have them, copy src and setup databse
1. Open a browser and go to [http://localhost:3000](http://localhost:3000) and you should see the entry page
1. `docker-compose down` will close it down

Note if you make changes and want to rebuild image run `docker-compose up --build`

Docker env variables are defined in **.envdocker** which then gets copied over .env if you want to change values.

### Manual Setup

Manual setup has a few more steps but is pretty easy.

In this example we'll setup a database called hackthecat and a user to access the database called hackthecat.

### Setup Database

1. First let's setup the database. Login to mysql with `sudo mysql`
1. Create a database `CREATE DATABASE hackthecat;`
1. Create a user with the following statement and replace `<password>` with the password you want to use: `CREATE USER 'hackthecat'@'localhost' IDENTIFIED BY '<password>';`
1. Give the new user privelages to db `GRANT ALL PRIVILEGES ON hackthecat.* TO 'hackthecat'@'localhost';`
1. Refresh the database privileges `flush privileges;`

### Setup application

* Create a file called .env in /web with the following content (replacing the <..> bits with options you have used - ensure there are no <>'s in this file!):

```
PORT=<port you want to run the app on e.g. 3000>
MYSQLHOST=<db host e.g. 127.0.0.1 or localhost>
MYSQLDATABASE=<database name e.g. hackthecat>
MYSQLUSER=<mysql user e.g. hackthecat>
MYSQLPASSWORD=<password you used above>
```

* Navigate to /web
* Run `npm install` 
* You'll get some warnings about components with issues in which is expected as this deliberately contains versions with issues
* Run `node app` to start the app 
* All being well you should now be able to access the app at http://localhost:3000 (or whatever port you have set it to in .env file)

## Free/Low cost learning resources

To learn more about appsec I recommend the following resources:

* [OWASP](https://owasp.org/) - sooo much great content!
* [Hacktricks](https://book.hacktricks.xyz/) - massive reference of offensive security techniques
* [Burp Accademy](https://portswigger.net/web-security) - heap of courses in various web techniques
* [TCM Academy](https://academy.tcm-sec.com/) - incredible value great security courses

## Credits

Original Idea and concept: Alex Mackey

### Design

Design Hacked/Adapted from https://html5up.net/

### Images

Cat Logo produced via Fiverr and the awesome [fiverdesigns](https://www.fiverr.com/fiverdesigns).

Bike Images from Pixabay (free stock photography and royalty-free stock media website):

* https://pixabay.com/vectors/racing-bicycle-racer-racing-bike-161449/
* https://pixabay.com/vectors/bicycle-bike-vintage-wheels-161524/