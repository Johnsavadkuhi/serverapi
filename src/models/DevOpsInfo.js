const mongoose = require('mongoose');
const { Schema } = mongoose;

// Subschema for login credentials
const CredentialSchema = new Schema({
  username: String,
  password: String
}, { _id: false });

// Subschema for access points (endpoints)
const EndpointSchema = new Schema({
  url: { type: String, required: true },
  credentials: [CredentialSchema],
  isDns: { type: Boolean, default: false }, 
  ip:String ,
  // 🔽 تکنولوژی مربوط به همین endpoint
  technologyStack: {
    frontendLanguage: String,
    backendLanguage: String,
    databases: [String],
    frameworks: [String],
    webServer: String
  }
}, { _id: false });

// Subschema for platform-specific data
const PlatformDataSchema = new Schema({
  // Web platform
  web: {
    type: new Schema({
      environmentType: {
        type: String,
        enum: ['OVF', 'VM', 'Docker', 'Production', 'Development'],
        required: true
      },
      accessInfo: {
        address: String,
        port: String,
        username: String,
        password: String,
        notes: String
      }, 
        // مخصوص VM/OVF
  vmInfo: {
    vmName: String,
    osType: String,
    hypervisor: String,
    sshKey: String,
    snapshot: String
  },
  // مخصوص Docker
  dockerInfo: {
    imageName: String,
    containerName: String,
    ports: [String],        // e.g. ["8080:80"]
    volumes: [String],      // e.g. ["/host:/container"]
    envVariables: [String], // e.g. ["KEY=value"]
    command: String,
    network: String,
    dockerHost: String,
    registry: String,
    auth: {
      username: String,
      password: String
    }
  },
    }, { _id: false }),
    default: undefined
  },

  // Mobile platform
  mobile: {
    type: new Schema({
      appFile: String, // path to uploaded .apk or .ipa
      platform: { type: String, enum: ['android', 'ios'] }
    }, { _id: false }),
    default: undefined
  },

  // Desktop platform
  desktop: {
    type: new Schema({
      installerFile: String,
      os: String // e.g., 'windows', 'linux', 'macos'
    }, { _id: false }),
    default: undefined
  }
}, { _id: false });

// Subschema for technology stack
const TechnologyStackSchema = new Schema({
  web: {
    type: new Schema({
      frontendLanguage: String,
      backendLanguage: String,
      databases: [String],
      frameworks: [String],
      webServer: String,
    }, { _id: false }),
    default: undefined
  },
  mobile: {
    type: new Schema({
      platform: { type: String, enum: ['android', 'ios'] },
      language: String,
      sdkVersion: String,
      frameworks: [String]
    }, { _id: false }),
    default: undefined
  },
  desktop: {
    type: new Schema({
      language: String,
      frameworks: [String],
      osTargets: [String] // e.g., ['windows', 'linux']
    }, { _id: false }),
    default: undefined
  }
}, { _id: false });



// Main DevOps Info per user working on a project
const DevOpsInfoSchema = new Schema({
   // Link to project and pentester
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  pentester: { type: Schema.Types.ObjectId, ref: 'User', required: false },

  platform: { type: String, enum: ['web', 'mobile', 'desktop'] },
  platformData: PlatformDataSchema,
  endpoints: [EndpointSchema], 
  isShared: {
  type: Boolean,
  default: false
  }, 
technologyStack: TechnologyStackSchema

});
DevOpsInfoSchema.index({ project: 1, pentester: 1  }, { unique: true });



module.exports = mongoose.model('DevOpsInfo', DevOpsInfoSchema);
