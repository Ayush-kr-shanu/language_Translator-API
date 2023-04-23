const mongoose=require("mongoose")

const videoSchema=mongoose.Schema({
    video:{type: String, required:true}
})

const Video=mongoose.model("video", videoSchema)

module.exports={
    Video
}