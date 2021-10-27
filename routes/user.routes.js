/* -------------------------------------------------------------------------- */
/*                              External imports                              */
/* -------------------------------------------------------------------------- */

const express = require("express")
const router = express.Router()

/* -------------------------------------------------------------------------- */
/*                              Internal imports                              */
/* -------------------------------------------------------------------------- */

const cloudinary = require("../utils/cloudinary")
const upload = require("../utils/multer")
const User = require("../models/user.model")
const { url } = require("../utils/cloudinary")


// The deafault avatar which appears on the landing page
let defaultPicture = "https://res.cloudinary.com/dd3hmuucq/image/upload/v1634669348/default_1_hh5cfv.jpg"

router.get("/", (req, res) => {

    try {            
        res.render("home", {
            title: "Foto App",
            defaultAvatar: defaultPicture
        })
    } catch (err) {
        console.log(err)
    }

})


router.post("/", upload.single("image"), async (req, res) => {
        
    try{
        
        // upload file to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path)
        
        // query_id
        const query_id = `${result.public_id}`

        // create instance of a user
        let user = new User({
            query_id: query_id,
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
            updated: Date.now()
        })

        // save user to db
        await user.save((err) => {
            if (!err) return res.redirect(`/transformation/${query_id}`)
            console.log(err)
        })        
    }catch (err ){
        console.log(err)
    }

})

var effects;
router.get("/transformation/:imageId", (req, res) => {    

    try {

        // console.log(`Query data from the root route: ${req.query.secret}`)
        const identifier = req.query.identifier
        const url = req.query.url

        if (identifier) {
            
            effects = req.query.effects.replace(/,/g, " ").split(" ")
            
            res.render("transformation", {
                title: "Transformation",
                defaultAvatar: url,
                publicId: identifier,
                appliedEffects: effects
            })

        } else {

            const image = User.findOne(
                {query_id: req.params.imageId},
                (err, document) => {
                    if (err) return console.log(err)
                    res.render("transformation", {
                        title: "Transformation",
                        defaultAvatar: document.avatar,
                        publicId: document.cloudinary_id,
                        appliedEffects: []
                    })
                }
            )
        }

    } catch (err) {
        console.log(err)
    }

})



// Transformation URL structure
// https://res.cloudinary.com/<cloud_name>/<asset_type>/<delivery_type>/<transformations>/<version>/<public_id>.<extension>
router.post("/transformation/:imageId", (req, res) => {
    
    const { effect, format, quality, cornerRadius, rotationAngle, previewBtn } = req.body
    // console.log(req.query)
    console.log(req.body)

    let sanitizedQuality = `q_${req.body.quality}`
    let sanitizedCornerRadius = `r_${req.body.cornerRadius}`
    let sanitizedRotationAngle = `a_${req.body.rotationAngle}`

    // Format has been remoevd from the options
    // getFormat: req.body.format, 
    const option = {
        getEffect: req.body.effect,
        getQuality: sanitizedQuality,
        getCornerRadius: sanitizedCornerRadius,
        getRotationAngle: sanitizedRotationAngle
    }

    const processEntry = (args) => {

        let finalString = ""
        let sanitizedEffectBundle = []
        for (let key in args) {
          if (args[key] != "") {
            sanitizedEffectBundle.push(args[key])
          }
        } 
        let string = sanitizedEffectBundle.join(",")
      
        // check if string contains ",a_"
        // if it does, replace it with "/a_"
        console.log(string)
        if (string.search(",a_") !== -1) {
          finalString = string.replace(",a_", "/a_")
        }
        return finalString
    }

    const getArrayOfEffects = (args) => {
        let sanitizedEffectBundle = []

        for (let key in args) {
          if (args[key] != "") {

            switch (args[key]) {
                case "e_art:incognito":
                    sanitizedEffectBundle.push("Effect(Artistic_Filter)")
                    break;
                case "e_assist_colorblind":
                    sanitizedEffectBundle.push("Effect(Assist_Colorblind)")
                    break;
                case "e_cartoonify":
                    sanitizedEffectBundle.push("Effect(Cartoonify)")
                    break;
                case "e_blur:100":
                    sanitizedEffectBundle.push("Effect(Blur)")
                    break;
                case "e_grayscale":
                    sanitizedEffectBundle.push("Effect(Grayscale)")
                    break;
                case "e_hue":
                    sanitizedEffectBundle.push("Effect(Hue)")
                    break;
                case "e_morphology":
                    sanitizedEffectBundle.push("Effect(Morphology)")
                    break;
                case "e_negate":
                    sanitizedEffectBundle.push("Effect(Negate)")
                    break;
                case "e_oil_paint:30":
                    sanitizedEffectBundle.push("Effect(Oil_Paint)")
                    break;
                case "e_outline":
                    sanitizedEffectBundle.push("Effect (Outline)")
                    break;
                case "e_pixelate":
                    sanitizedEffectBundle.push("Effect (Pixelate)")
                    break;
                case "e_sepia":
                    sanitizedEffectBundle.push("Effect (Sepia)")
                    break;
                case "e_sharpen:100":
                    sanitizedEffectBundle.push("Effect (Sharpen)")
                    break;
                case "e_tint":
                    sanitizedEffectBundle.push("Effect (Tint)")
                    break;
                case "e_vectorize":
                    sanitizedEffectBundle.push("Effect (Vectorize)")
                    break;
                case "e_vignette":
                    sanitizedEffectBundle.push("Effect (Vignette)")
                    break;
                case "jpg":
                    sanitizedEffectBundle.push("Format (jpg)")
                    break;
                case "png":
                    sanitizedEffectBundle.push("Effect (png)")
                    break;
                case "bmp":
                    sanitizedEffectBundle.push("Effect (bmp)")
                    break;
            
                default:
                    break;
            }

            if (key == "getQuality") {sanitizedEffectBundle.push(`Quality(${req.body.quality})`)}
            if (key == "getCornerRadius") {sanitizedEffectBundle.push(`Corner_Radius(${req.body.cornerRadius}px)`)}
            if (key == "getRotationAngle") {sanitizedEffectBundle.push(`Rotation_Angle(${req.body.rotationAngle}deg)`)}

          }
        } 
        return sanitizedEffectBundle
    }

    
    const preTransformationURI = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`
    const transformationURI = processEntry(option)
    const postTransformationURI = `/v1634927392/${req.body.previewBtn}.png`
    const finalURL = `${preTransformationURI}${transformationURI}${postTransformationURI}`

    console.log(preTransformationURI)
    console.log(transformationURI)
    console.log(postTransformationURI)
    console.log(finalURL)
    
    
    const button = req.body.previewBtn  
    res.redirect(`/transformation/${button}/?url=${finalURL}&effects=${getArrayOfEffects(option)}&identifier=${button}`)

    

})


module.exports = router