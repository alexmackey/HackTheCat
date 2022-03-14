# Hackthecat - Better Defence through Learning Offence
Hackthecat is a deliberately vulnerable node express/mysql app intended for teaching, demonstrating and practicing AppSec skills.

![HackTheCat Logo ](web/assets/images/hackTheCatLogo.png?raw=true "HackTheCat Logo")

AppSec is generally not taught well (if at all) and we can write better, more secure applications if we understand the approaches and techniques attackers will use to exploit solutions. This sample application allows you to attack (and fix up) various common issues.

This is also a good practice application for those studying for security certifications such as Offensive Security's [OSCP](https://www.offensive-security.com/pwk-oscp/) or [AWAE](https://www.offensive-security.com/learn-one/awaeoswe/).

## IMPORTANT READ ME FIRST

This application is intended to teach and learn AppSec concepts and contains many security issues including some that will lead to RCE (Remote Code Execution). 

**Under no circumstances should this app be exposed directly to the internet or installed on a sensitive machine/network. If an attacker can access this site then it will be very easy for them to gain full access to the machine it is running on and potentially the network the machine is connected to.**

This software is licensed under [Creative Commons Attribution-NonCommercial 4.0 International](https://creativecommons.org/licenses/by-nc/4.0/legalcode) and as per the license:

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

## What issues does this application contain?

**Spoiler alert! Skip this section if you want to find the various issues yourself :)**

This sample application contains many issues you can practice exploting and fixing up including:

* XSS (stored and reflected)
* Various different SQL Injection issues
* Weak session cookie options
* Weak encoding options
* LFI (Local File Inclusion)/RFI (Remote File Inclusion)
* RCE via vulnerable version of node-serialize (0.4)
* RCE via Side Template Injection (SSTI) in vulnerable version of pug template engine (2.0.4)
* Unrestricted file upload
* Left over mock credentials file discoverable via brute force
* IDOR (Indirect object reference)
* Poor and inconsistently implemented authentication approach
* Some crappy CSS/HTML hacks to a template I made..

Found something else? Awesome let me know :)

In the future I plan to add the following:

* Documentation/labs walking through various issues
* Different levels of difficulty e.g. implementing naive and basic XSS filters

## User Details

The database will be setup to contain the following two users:

* username: admin, password: pass (has access to admin panel options)
* username: user, password: pass

## Pre-Requisites

This application has been tested on Linux (Ubuntu) and Windows 10.

If you are not using the docker images you will need the following:

* Node (tested with v16.14.0 Ubuntu)
* MySQL (tested with 8.0.28-0ubuntu0.20.04.3 Ubuntu)

If you want to use Docker option well you'll obviously need Docker and Python as well for some reason I dont understand which I think has something to do with Docker compose.

## Setup

**IMPORTANT! Again be careful where you install this site as it will be easy for an attacker to exploit it** 

This application is very simple and consists of:

* Node Express App using EJS template engine
* MySQL

You have two setup options:

* Docker (easiest but hardest to play with code)
* Manual

If you want to play and experiment with the code Manual setup will be your best option.

### Docker

Linux users will probably need to prefix these commands with `sudo` unless you are running as **root** which you probably should not be.

1. Open a shell and navigate to where **docker-compose.yaml** lives is and run `docker-compose up`
1. Docker will download base images if you dont already have them already, copy src directory, copy .envdocker file over any .env file you have, restore node packages and setup databse
1. Open a browser and go to [http://localhost:3000](http://localhost:3000) and you should see a page like this:

![HackTheCat Site Image](web/assets/images/hackTheCatSite.png?raw=true "HackTheCat Site Image")

1. `docker-compose down` will close it down

Note if you make changes to the code then you will need to rebuild the images so run `docker-compose up --build`

### Manual Setup

Manual setup has a few more steps but is pretty easy.

In this example we'll setup a database called `hackthecat`, a user to access this database and give them the password `catsarebest`.

### Setup Database

1. First let's setup the database so login to mysql with `sudo mysql`
1. Create a database: `CREATE DATABASE hackthecat;`
1. Create a user: `CREATE USER 'hackthecat'@'localhost' IDENTIFIED BY 'catsarebest';`
1. Give the new user all privileges to access the hackthecat database: `GRANT ALL PRIVILEGES ON hackthecat.* TO 'hackthecat'@'localhost';`
1. Refresh the database privileges with `flush privileges;`

### Setup application

1. First we need to create a file called .env in /web which will tell the app how to conenct to the database. Take the following content (replacing the <..> bits with options you have used) and ensuring there are no <>'s in this file!:

```
PORT=<port you want to run the app on e.g. 3000>
MYSQLHOST=<db host e.g. 127.0.0.1 or localhost>
MYSQLDATABASE=<database name e.g. hackthecat>
MYSQLUSER=<mysql user e.g. hackthecat>
MYSQLPASSWORD=<password you used above e.g. catsarebest>
```

The settings we discussed above would look like this:

```
PORT=3000
MYSQLHOST=127.0.0.1
MYSQLDATABASE=hackthecat
MYSQLUSER=hackthecat
MYSQLPASSWORD=catsarebest
```

1. Next go to /web directory
1. Run `npm install` 
1. You'll get some warnings about components with high severity issues which is expected as this app contains third party libs with known issues
1. Run `node app` to start the app 
1. All being well you should now be able to access the app at http://localhost:3000 (or whatever port you have set it to in .env file)

## Free/Low cost learning resources

To learn more about appsec I recommend the following resources:

* [OWASP](https://owasp.org/)
* [Hacktricks](https://book.hacktricks.xyz/)
* [Burp Accademy](https://portswigger.net/web-security)
* [TCM Academy](https://academy.tcm-sec.com/)
* [Ippsec Rocks](https://ippsec.rocks/?#)

## Credits

Original Idea and concept: Alex Mackey

### Template

Design Hacked/Adapted from [https://html5up.net/](https://html5up.net/) (creative commons Attribution 3: https://html5up.net/license)

### Images

HackTheCatLogo and Cat Bicycles logo produced via Fiverr and the awesome [fiverdesigns](https://www.fiverr.com/fiverdesigns).

Bike Images from Pixabay (free stock photography and royalty-free stock media website):

* https://pixabay.com/vectors/racing-bicycle-racer-racing-bike-161449/
* https://pixabay.com/vectors/bicycle-bike-vintage-wheels-161524/