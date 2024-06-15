const multer = require('multer');
const cloudinary = require('../utility/cloudinary');
const fs = require('fs');
const path = require('path');
const ProductsModel = require('../models/product/ProductModel');
const DetailsService = require('../services/common/DetailsService');
const DropDownService = require('../services/common/DropDownService');
const ListTwoService = require('../services/common/ListTwoService');


// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
}).array('images', 5);

// multer configuration end
// create product start

exports.CreateProduct = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ status: 'failed', message: err.message });
      }

      const body = req.body;
      const images = req.files.map(file => file.path);

      try {
        const promises = images.map(imagePath => {
          return cloudinary.uploader.upload(imagePath, {
            folder: 'productsimages'
          });
        });
        const uploadImages = await Promise.all(promises);

        let email = req.headers.email;
        const product = await ProductsModel.create({
          userEmail: email,
          name: body.name,
          unit: body.unit,
          details: body.details,
          images: uploadImages.map(image => image.secure_url),
          categoryId: body.categoryId,
          brandId: body.brandId
        });

        // Clean up uploaded files from the server
        images.forEach(imagePath => {
          fs.unlink(imagePath, err => {
            if (err) console.error('Failed to delete local file:', err);
          });
        });

        res.status(200).json({ status: 'success', data: product });
      } catch (cloudinaryError) {
        console.error('Cloudinary upload error:', cloudinaryError);
        res.status(500).json({ status: 'failed', message: 'Failed to upload images to Cloudinary', error: cloudinaryError.message });
      }
    });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(200).json({ status: 'failed', message: 'Internal server error', error: error.message });
  }
};
// create product end


// product details start
exports.ProductDetailsById = async (req, res) => {
    try {
        const result = await DetailsService(req, ProductsModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in brand details:", error);
        res.status(200).json({ error: "Internal server error" });
    }
}
// product details end


// product dropdown 
exports.ProductDropDown = async (req, res) => {
    try {
        const result = await DropDownService(req, ProductsModel, {_id: 1, name: 1});
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in brand details:", error);
        res.status(200).json({ error: "Internal server error" });
    }
}

exports.UpdateProduct = async (req, res) => {
    try {
        // Handle file uploads
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ status: 'failed', message: err.message });
            }

            const body = req.body;
            const images = req.files.map(file => file.path);

            let userEmail = req.headers.email;
            let id = req.params.id;

            // Find the product by ID and user email
            let product = await ProductsModel.findOne({ _id: id, userEmail: userEmail });

            if (!product) {
                return res.status(404).json({ status: 'failed', message: 'Product not found' });
            }

            // Delete old images from Cloudinary
            if (product.images && product.images.length > 0) {
                const deletePromises = product.images.map(imageUrl => {
                    const publicId = imageUrl.split('/').pop().split('.')[0];
                    return cloudinary.uploader.destroy(`productsimages/${publicId}`);
                });

                await Promise.all(deletePromises);
            }

            // Upload new images to Cloudinary
            const uploadPromises = images.map(imagePath => {
                return cloudinary.uploader.upload(imagePath, {
                    folder: 'productsimages'
                });
            });
            const uploadImages = await Promise.all(uploadPromises);
            const newImages = uploadImages.map(image => image.secure_url);

            // Update product with new data and images
            const updatedProduct = await ProductsModel.findOneAndUpdate(
                { _id: id, userEmail: userEmail },
                {
                    name: body.name,
                    unit: body.unit,
                    details: body.details,
                    images: newImages,
                    categoryId: body.categoryId,
                    brandId: body.brandId
                },
                { new: true } // Return the updated document
            );

            res.status(200).json({ status: 'success', data: updatedProduct });
        });
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(200).json({ status: 'failed', message: 'Internal server error', error: error.message });
    }
};

// product update end

// product list start 
exports.ProductList = async (req, res) => {
    try {
        // Create a case-insensitive regex search pattern from the searchText parameter
        let searchRegex = { $regex: req.params.searchText, $options: "i" };

        // Define the aggregation pipeline stages
        let JoinOneStage = {$lookup: {from: "categories",localField: "categoryId",foreignField: "_id",as: "category"}};

        let JoinTwoStage = { $lookup: { from: "brands",localField: "brandId",foreignField: "_id",as: "brand" }};

    let Array = [{ name: searchRegex }, {unit:searchRegex }, { details: searchRegex }, {"category.name": searchRegex}, {"brand.name" : searchRegex} ]

        // Execute the aggregation pipeline
      let result = await ListTwoService(req, ProductsModel,Array,JoinOneStage,JoinTwoStage);

        // Return the resulting product list
        res.status(200).json({ status: 'success', data: result });
    } catch (error) {
        console.error("Error in product list retrieval:", error);
        res.status(200).json({ status: 'failed', message: "Internal server error", error: error.message });
    }
};
// product list end


























