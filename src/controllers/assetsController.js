const mongoose= require("mongoose")
const Assets = require("../models/Assets")



const addAsset = async (req, res) => {
  try {
    const formData = req.body.formData;

    if (!formData) {
      return res.status(400).json({
        success: false,
        message: "No data provided.",
      });
    }

    const { name, type, ownerType, owner, departmentScope, platforms, serialNumber } = formData;

    // Required fields
    if (!name || !type || !ownerType || !departmentScope?.length || !platforms?.length) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: name, type, ownerType, departmentScope, and platforms are mandatory.",
      });
    }

    // Enums
    const validTypes = ["hardware", "software"];
    const validOwnerTypes = ["bank", "user"];
    const validDepartments = ["security", "quality"];
    const validPlatforms = ["web", "mobile", "desktop", "api"];

    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid value for 'type'.",
      });
    }

    if (!validOwnerTypes.includes(ownerType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid value for 'ownerType'.",
      });
    }

    if (!departmentScope.every((d) => validDepartments.includes(d))) {
      return res.status(400).json({
        success: false,
        message: "Invalid value for 'departmentScope'.",
      });
    }

    if (!platforms.every((p) => validPlatforms.includes(p))) {
      return res.status(400).json({
        success: false,
        message: "Invalid value for 'platforms'.",
      });
    }

    // Conditional owner validation
    if (ownerType === "user" && !owner) {
      return res.status(400).json({
        success: false,
        message: "Field 'owner' is required when ownerType is 'user'.",
      });
    }

    // Unique serial number check
    if (serialNumber) {
      const existingSerial = await Assets.findOne({ serialNumber });
      if (existingSerial) {
        return res.status(400).json({
          success: false,
          message: `An asset with serial number "${serialNumber}" already exists.`,
        });
      }
    }

    // Save asset
    const newAsset = new Assets(formData);
    const savedAsset = await newAsset.save();

    return res.status(201).json({
      success: true,
      message: "Asset added successfully.",
      data: savedAsset,
    });
  } catch (error) {
    console.error("Error adding asset:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while saving asset.",
      error: error.message,
    });
  }
};

const getAssets = async (req, res) => {
  try {
    const { formData } = req.body;
    if (!formData || !formData.userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required in formData",
      });
    }

    const userId = formData.userId;
    const page = parseInt(formData.page) || 1;
    const limit = parseInt(formData.limit) || 10;
    const search = formData.search || "";
    const query = { owner: userId }; // ✅ فقط دارایی‌های این کاربر

    // ✅ فیلترهای اضافه
    if (formData.type) query.type = formData.type;
    if (formData.status) query.status = formData.status;
    if (formData.departmentScope) query.departmentScope = formData.departmentScope;
    if (formData.platform) query.platforms = formData.platform;

    // ✅ جستجو در چند فیلد
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { model: { $regex: search, $options: "i" } },
        { serialNumber: { $regex: search, $options: "i" } },
        { licenseKey: { $regex: search, $options: "i" } },
      ];
    }

    // ✅ شمارش کل آیتم‌ها
    const totalDocs = await Assets.countDocuments(query);

    // ✅ دریافت داده‌ها با صفحه‌بندی
    const data = await Assets.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      message: "Assets fetched successfully",
      data,
      page,
      totalDocs,
      totalPages: Math.ceil(totalDocs / limit),
    });
  } catch (error) {
    console.error("❌ Error fetching assets:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching assets",
      error: error.message,
    });
  }
};

const getAsset= async (req , res)=>{

    const {assetId}= req.query 

    try {
    const asset = await Assets.findById(assetId).populate("owner", "firstName lastName")
    if (!asset) return res.status(404).json({ success: false, message: "Asset not found" });

    res.status(200).json({ success: true, data: asset });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
} 

const updateAsset = async (req, res) => {
  try {
    const { assetId, formData } = req.body;

    if (!assetId) {
      return res.status(400).json({
        success: false,
        message: "Missing assetId in request body.",
      });
    }

    if (!formData) {
      return res.status(400).json({
        success: false,
        message: "No update data provided.",
      });
    }

    const { name, type, ownerType, owner, departmentScope, platforms, serialNumber } = formData;

    // === Required Field Validation ===
    if (!name || !type || !ownerType || !departmentScope?.length || !platforms?.length) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: name, type, ownerType, departmentScope, and platforms are mandatory.",
      });
    }

    // === Enum Validation ===
    const validTypes = ["hardware", "software"];
    const validOwnerTypes = ["bank", "user"];
    const validDepartments = ["security", "quality"];
    const validPlatforms = ["web", "mobile", "desktop", "api"];

    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid value for 'type'.",
      });
    }

    if (!validOwnerTypes.includes(ownerType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid value for 'ownerType'.",
      });
    }

    if (!departmentScope.every((d) => validDepartments.includes(d))) {
      return res.status(400).json({
        success: false,
        message: "Invalid value for 'departmentScope'.",
      });
    }

    if (!platforms.every((p) => validPlatforms.includes(p))) {
      return res.status(400).json({
        success: false,
        message: "Invalid value for 'platforms'.",
      });
    }

    // === Conditional Owner Check ===
    if (ownerType === "user" && !owner) {
      return res.status(400).json({
        success: false,
        message: "Field 'owner' is required when ownerType is 'user'.",
      });
    }

    // === Ensure asset exists ===
    const existingAsset = await Assets.findById(assetId);
    if (!existingAsset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found.",
      });
    }

    // === Check for duplicate serial number (ignore current asset) ===
    if (serialNumber) {
      const duplicate = await Assets.findOne({
        serialNumber,
        _id: { $ne: assetId },
      });
      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: `Another asset with serial number "${serialNumber}" already exists.`,
        });
      }
    }

    // === Perform the update ===
    const updatedAsset = await Assets.findByIdAndUpdate(assetId, formData, {
      new: true,
      runValidators: true,
    });

    if (!updatedAsset) {
      return res.status(500).json({
        success: false,
        message: "Failed to update asset.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Asset updated successfully.",
      data: updatedAsset,
    });
  } catch (error) {
    console.error("Error updating asset:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating asset.",
      error: error.message,
    });
  }
};

const deleteAsset = async (req, res) => {
  try {
    const { assetId } = req.body;

    if (!assetId) {
      return res.status(400).json({
        success: false,
        message: "Missing 'assetId' in request body.",
      });
    }

    // بررسی وجود دارایی
    const existingAsset = await Assets.findById(assetId);
    if (!existingAsset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found.",
      });
    }

    // حذف دارایی
    await Assets.findByIdAndDelete(assetId);

    return res.status(200).json({
      success: true,
      message: `Asset '${existingAsset.name}' deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting asset:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting asset.",
      error: error.message,
    });
  }
};



module.exports = {
addAsset , 
getAssets , 
getAsset , 
updateAsset, 
deleteAsset
}