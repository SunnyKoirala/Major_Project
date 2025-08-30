const mongoose = require("mongoose");
const allData=require("./data");
const Listing=require("../models/listing");

main()
  .then(() => {
    console.log("successfully connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/practise");
}

const initData=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(allData.data);
    console.log("Data saved successfully");
}

initData();
