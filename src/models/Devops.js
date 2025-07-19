const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Optional: Reusable sub-schema for endpoints (web platform)
 */
const EndpointSchema = new Schema({
  url: { type: String, required: true },
  method: { type: String, default: 'GET' },
  description: { type: String },
  credentials: {
    username: { type: String },
    password: { type: String }, // Encrypt or hash in production
    token: { type: String },
    notes: { type: String }
  }
}, { _id: false });

const DevOpsInfoSchema = new Schema({
  // Link to project and pentester
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  pentester: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  // Environment metadata
  envType: {
    type: String,
    enum: ['docker', 'vm', 'ovf', 'other'],
    required: true
  },
  envImage: { type: String, required: true }, // e.g. Docker tag or OVF path

  // Platform type
  platform: {
    type: String,
    enum: ['web', 'mobile', 'desktop', 'blockchain'],
    required: true
  },

  // Platform-specific data
  platformData: {
    type: Schema.Types.Mixed,
    default: {}
    /**
     * web: {
     *   browserTargets: ['chrome', 'firefox'],
     *   webServerURL: 'http://target.com',
     *   endpoints: [ EndpointSchema ]
     * }
     * 
     * mobile: {
     *   appFile: 'uploads/app.apk',
     *   platform: 'android',
     *   emulatorImage: 'android.img'
     * }
     *
     * desktop: {
     *   installerFile: 'app.exe',
     *   osTarget: 'windows'
     * }
     *
     * blockchain: {
     *   nodeInfo: 'Geth Node',
     *   smartContracts: ['0xabc...', '0xdef...'],
     *   network: 'Ropsten'
     * }
     */
  },

  // Virtual environment config (resource allocation)
  config: {
    cpu: { type: String },
    ram: { type: String },
    storage: { type: String },
    os: { type: String }
  },

  // Connection details for the virtual machine/container
  runtimeAccess: {
    address: { type: String, required: true },
    port: { type: Number, required: true },
    protocol: {
      type: String,
      enum: ['ssh', 'rdp', 'http', 'https', 'custom'],
      default: 'ssh'
    },
    username: { type: String },
    password: { type: String }, // Store securely
    sshKeyReference: { type: String },
    startupScript: { type: String },
    environmentVars: { type: Map, of: String },
    internalIP: { type: String },
    volumeMountPath: { type: String },
    osPlatform: { type: String }
  },

  // Optional global access credentials
  accessCredentials: {
    username: { type: String },
    password: { type: String }, // Encrypt or vault
    notes: { type: String }
  },

  // Status and notes
  status: {
    type: String,
    enum: ['pending', 'initializing', 'active', 'failed', 'archived'],
    default: 'pending'
  },
  logs: { type: String },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Auto-update updatedAt on save
DevOpsInfoSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('DevOpsInfo', DevOpsInfoSchema);
