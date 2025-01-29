import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
name:{type:String,reuired:true},
dob:{type:Date,required:true},

  },
  {timrStamps:true}
);

export default mongoose.model("Data", DataSchema);