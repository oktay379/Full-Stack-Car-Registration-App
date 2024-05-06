import { CarModel } from "../models/CarModel.js";


const createCar = async (req, res) => {
    try {
        const {title, desc, file, email, plate} = req.body;

        if(!plate) {
            return res.status(400).json({error: 'Plaka Girisi Yapiniz'});
        }

        if (!validatePlate(plate)) {
            return res.status(400).json({ error: 'Plaka formatı geçersiz' });
        }

        const newCar = new CarModel({
            title: title,
            desc: desc,
            file: req.file.filename,
            email: email,
            plate: plate
        })
        await newCar.save();
        return res.status(201).json({added: true ,newCar});
    } catch (error) {
        return res.status(500).json(error);
    }
}


const getCars = async (req, res) => {
    try {
        const cars = await CarModel.find();
        return res.status(200).json(cars);
    } catch (error) {
        return res.status(500).json(error);
    }
}


const singleCar = async (req, res) => {
    try {
        const id = req.params.id
        const car = await CarModel.findById({ _id: id });
        return res.status(200).json(car);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const updateCar = async (req, res) => {
    try {
        const id = req.params.id
        const { title, desc, plate } = req.body;
        const file = req.file.filename; // Dosya update yapmak için bu şekilde kullanılır.

        if (!validatePlate(plate)) {
            return res.status(400).json({ error: 'Plaka formatı geçersiz' });
        }
        
        const car = await CarModel.findByIdAndUpdate(id, { title, desc, file, plate }, { new: true });

        return res.status(200).json({ update: true, car });
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
};




const deleteCar = async (req, res) => {
    try {
        const id = req.params.id
        const car = await CarModel.findByIdAndDelete({ _id: id })
        return res.status(200).json({deleted: true, car});  
    }   
    catch (error) {
        return res.status(500).json(error)
    }
}


const validatePlate = (plate) => {
    const plateRegex = /^[0-9]{2}[A-Z]{1,3}[0-9]{1,4}$/;
    return plateRegex.test(plate);
};



export { createCar, getCars, singleCar, updateCar, deleteCar };