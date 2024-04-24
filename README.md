# Eastercup: international youth basketball tournament  

## Description

Website and internal tool for annual youth international basketball tournament in Klatovy written in Typescript and with Next.js. 

## Why 

The main purpose of this project is two-fold. Mainly it should serve teams as a registration platform, a way to get latest news from tournament and all the info they need. 

Also it contains an internal tool for the organizers that can help them in all sorts of administrative tasks around the tournament. 

More info about both in [Usage](#Usage)

## Quick start 

For end-users there is a website: [eastercupklatovy.cz](https://eastercupklatovy.cz).
Part of the internal tool is now hosted here: [uibakery](https://cloud.uibakery.io/eastercup/). 

## Usage

- user facing page
	- registration with service orders 
	- live results 
	- group and final standings 
	- info pages (interactive map, content pages)
- API
	- generating invoices 
	- sending emails 
	- various endpoints for the internal tool 
- internal tool
	- generating invoices 
	- managing team accomodation
	- basic CRUD stuff around accounting, team orders etc

### Registration 

Registration is opened during the registration period which usually opens three months prior to the start of the tournament. 

Besides the basic team info we also gather business credentials (for accounting) and orders. These include food, accomodation preferences and tournament tshirts. 

The registration form is a multiple step wizard, to ease the registration flow for teams (there is a lot of info to fill out). Each step has its own route and all the fields are validated with Zod. There are also some conditional fields.

At the end of the registration flow the API sends out some basic info and an invoice for registration fee to the registered email via a backround job.

Because I wanted to save some bundle-space, I've moved all the registration code to branch [state/with-registration](https://github.com/Marty-W/eastercup/tree/state/with-registration) after closing the registration window.

### Live results and team standings

These are posted real-time in the internal tool and displayed on the website. The need for group and final standings came from the organizers during the tournament, so I decided to compute group standings on each request (the db schema wasn't prepared for this). With caching it ended up quite fast, but next year I will have to change it. 

### Content pages and map 

These include some basic info about the tournament etc. The map is provided by Google Maps API and displays important places and also where the matches are played. It was really easy using the API but the actual page needs some polishing.

### API 

#### Generating invoices 

I've used the awesome react pdf package that allowed me to use react component syntax to build up the invoices. 

#### Sending out emails 

The project is using Postmark API to send bulk emails. The pricing is not that great, but building with it and using it was a joy. Because we didn't want the user to wait too long for the invoice generation and also we wanted to send them via email I've moved the invoice generation and email sending to a background job. For this I've used trigger.dev. I think I will find more use cases for this library in the future.

#### Others 

There are some more endpoints used either by the internal tool or user-facing website.

### Internal tool 

#### Why 

I decided to use some sort of low-code solution when the tournament start was approaching and the organizers still weren't sure what the actually need and the speed of iteration was really high. Luckily, uiBakery let me desing the frontend in their platform pretty quickly and even the data flows weren't that hard to code up. Also the integration with my psql db was good enough and hitting my own API endpoints was straightforward. 

Of course I ended up with a lot of spaghetti code and the internal tool really needs to be written again. I think that tRPC will really shine here and I will code a custom internal tool for next year.

#### What it does

So at the beginning of our communication it wasn't really clear but the actual demands ended up being quite complex. 

- Main demands of organizers: 
    - quickly look up teams and their orders
    - generate invoices for teams during the accreditation 
    - register accomodation capacities with different prices per night, room capacities etc 
    - organize rooms within these capacities and assign team members with variable lenght of stay
    - generate food orders for canteens etc 
    - other CRUD functionality

We've ended up with a working solution but coding it up wasn't super pleasant. MVP with these low code platforms gets done pretty quickly, but when you start adding complexity they crumble really fast. 

If I would need to do this all over again, I would straigt up code my own solution from the start.

## Other remarks

### Imporatnt libs used 

- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- PostgreSQL (serverless, hosted by [Neon](https://neon.tech))
- [Tailwind CSS](https://tailwindcss.com/)
- [Shad-cn](https://shad-cn.com) for UI primitives
- [react-pdf](https://react-pdf.org/) 
- [trigger.dev](https://trigger.dev/) and [postmark](https://postmarkapp.com/) for generating invoices and sending emails
- [React Query](https://react-query.tanstack.com/)
- [Zod](https://github.com/colinhacks/zod) 

### Story time

I was actually approached by a family member (who is one of the founders) with a question if I could help them update their website. At the beginning it was coined only as a landing page but ended up being rather complex.

### What I want to change for next year 

- I've branched out all the team registration stuff to [state/with-registration](https://github.com/Marty-W/eastercup/tree/state/with-registration). Gotta save bundle space.
	- the branch won't have up to date code, so just rebase
- implement own backed and ditch uiBakery
- add some interactive animations with framer motion
	- the landing page animation with the bento card is nice, but we really do need more
- the font is questionable, especially for long text
	- it was chosen by the designer, but I think we need to change it
- use github issues for features?
