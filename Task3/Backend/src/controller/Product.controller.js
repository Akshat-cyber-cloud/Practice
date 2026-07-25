import Product from "../model/Product.model";

export const getAllProducts = async (req,res) => {
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const products = await Product.find()
            .skip(skip)
            .limit(limit);


        const totalProducts = await Product.countDocuments();

        const totalPages = Math.ceil(totalProducts / limit);

        return res.status(200).json({
            success : true,
            page,
            limit,
            totalProducts,
            totalPages,
            data : products,
        });
    }
    catch(error){
        console.log("Error : ", error.message);

        return res.status(500).json({
            success : false,
            message : "Failed to fetch products",
            error : error.message,
        });
    }
}