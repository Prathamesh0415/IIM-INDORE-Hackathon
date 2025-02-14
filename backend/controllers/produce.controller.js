import { Produce, validateProduce} from '../models/produce.model.js'

export const addProduce = async (req, res) => {
    try{
        const { error } = validateProduce(req.body)
        if(error){
            res.status(400).send({message: error.details[0].message})
        }
        const id = req.id
        const { itemName, itemDescription, itemPrice } = req.body;
        const produce = await Produce.create({
            itemName,
            itemDescription,
            itemPrice,
            seller: id
        })
        res.status(200).send({
            produce,
            message: "item created successfully",
            success: true
        })
    }catch(error){
        console.log("error in produce controller", error)
        res.status(400).send({message: "Internal server error"})
    }
}