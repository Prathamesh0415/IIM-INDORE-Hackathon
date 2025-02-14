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

export const deleteProduct = async (req, res) => {
    try{
        const productId = req.params.id
        if(!productId) return res.status(404).send("Error not found")
        const produce = await Produce.findByIdAndDelete(productId)
        if(!produce) res.status(404).send({message: "No produce found"})
        return res.status(200).send
        }catch(error){
        console.log("error in product controller", error``)
    }
}