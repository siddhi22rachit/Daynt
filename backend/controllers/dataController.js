import Data from '../models/Data.js';

// Create a new data entry
export const createData = async (req, res) => {
  try {
    const { name, dob } = req.body;
    const newData = new Data({ name, dob });
    await newData.save();
    res.status(201).json({ message: "Data added successfully", data: newData });
  } catch (error) {
    res.status(500).json({ message: "Error creating data", error });
  }
};

// Get all data entries
export const getData = async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

// Update an existing data entry
export const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dob } = req.body;
    
    const updatedData = await Data.findByIdAndUpdate(
      id,
      { name, dob },
      { new: true }
    );
    
    if (!updatedData) {
      return res.status(404).json({ message: "Data not found" });
    }
    
    res.status(200).json({ message: "Data updated successfully", data: updatedData });
  } catch (error) {
    res.status(500).json({ message: "Error updating data", error });
  }
};

// Delete a data entry
export const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await Data.findByIdAndDelete(id);
    
    if (!deletedData) {
      return res.status(404).json({ message: "Data not found" });
    }
    
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting data", error });
  }
};
