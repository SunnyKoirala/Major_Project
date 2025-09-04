const express=require("express");
const app=express();
const Listing=require("./models/listing");
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.engine("ejs",ejsMate);
main().then(()=>{
    console.log("Data saved successfully");
}).catch((err)=>{
    console.log(err);
});
async function main()
{
    await mongoose.connect("mongodb://127.0.0.1:27017/practise");
}


app.get("/",(req,res)=>{
    res.send("Hi, I am root");
});


app.get("/testListing",async(req,res)=>{
    let newListing=new Listing({
        title:"My Home",
        description:"This is the home that i build and lived",
        price:1500,
        location:"Kathmandu",
        country:"Nepal"
    });
    await newListing.save();
    console.log("data has been daved to DB");
    res.send("Saved successfully");
});

//Index Route
app.get("/listings",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index",{allListings});
});

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new");
});

//Create Route
app.post("/listings",async(req,res)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    console.log(newListing);
});

//Show Route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("listings/show",{listing});
});

//Edit Route
app.get("/listings/:id/edit",async(req,res)=>{
    let{id}=req.params;
    let listing=await Listing.findById(id);
    res.render("listings/edit",{listing});
});

//Update Route
app.put("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});


//Delete Route
app.delete("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})
app.listen(8080,()=>{
    console.log("Server is listening to port no 8080");
});

console.log("")