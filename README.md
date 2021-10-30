### Foto App

Foto App lets you apply a range of transformation effects to your picture, change format, fine-tune image quality, set corner radius, and rotation angle. And share to your favourite social media platform.

[Live Preview](https://use-foto-app.herokuapp.com/)

---

**Author:** 
- Giwa Jossy
---

**Demo** 👇🏼
![Foto App Homepage](https://res.cloudinary.com/dd3hmuucq/image/upload/v1635354772/foto%20App%20Shots/foto_app__ptshi5.jpg)


**After applying the "Vignette" effect, and adjusting the rotation angle** 👇🏼
![After Preview](https://res.cloudinary.com/dd3hmuucq/image/upload/v1635354772/foto%20App%20Shots/foto_app___qs35fx.jpg)

---

**Environments**
- Node version - v14.17.0


**Technologies:**
- NodeJS
- ExpressJS
- Multer
- Cloudinary

---

## To run the app manually
*note*: `run all commands in the application's root directory`

**Install all dependencies**

```
npm install
```

**Database**
```
- get a mongodb uri
- create a .env file [Recommended: Just rename the .env.example file I created in the root directory.]
- set the connection uri as MONGODB_URI in the .env file (i.e MONGODB_URI=<connection uri>)
```

**API Configuration**

Create a [cloudinary](https://cloudinary.com/) account;
```
- You will get a <cloud_name>, <api_key>, and <api_secret>
- In the .env file created above, populate the corresponding field for your cloud name, api key, and api secret
```


**Start the application**

```
npm run server
```

---
**Watch Demo**

![Foto App Demo](https://github.com/giwajossy/foto/blob/master/FotoAppDemo.gif)

---

## The Design Principles used are:

- DRY Principle
- KISS Principle
- YAGNI Principle


### DRY Principle:

```
I utilized this principle to make my code more composed and simpler to keep up. And furthermore spare my time at whatever point I need to change something later on.
```

### KISS Principle:

```
I utilized this principle to make it simpler for other software engineers to envision the different parts of the applications, intellectually planning the potential impacts of any change.
```

### YAGNI Principle:

```
I utilized this principle since it abstains from investing energy on features that may not be used and helps me avoid feature creep.
```

---


