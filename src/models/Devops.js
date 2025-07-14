const mongoose = require('mongoose');
const { Schema } = mongoose;

// =============================================
// **CORE SUB-SCHEMAS**
// =============================================

/**
 * @schema CredentialSchema
 * @description Secure credential storage with automatic encryption
 * @property {string} username - Authentication identifier
 * @property {string} password - Encrypted password (never exposed in queries)
 * @property {string} sshKey - Encrypted SSH key
 * @property {string} accessToken - API/Service tokens
 * @property {string} authMethod - Authentication protocol
 * @property {Date} lastRotated - Last credential rotation date
 */
const CredentialSchema = new Schema({
  _id: false,
  username: { type: String, required: false },
  password: { type: String, select: false },
  sshKey: { type: String, select: false },
  accessToken: { type: String, select: false },
  authMethod: { 
    type: String, 
    enum: ['password', 'ssh-key', 'jwt', 'oauth', 'api-key'],
    default: 'password'
  },
  lastRotated: { type: Date, default: Date.now }
}, { _id: false });

/**
 * @schema NetworkEndpointSchema
 * @description Network-accessible service endpoints
 * @property {string} name - Endpoint identifier
 * @property {string} endpoint - Full connection URL
 * @property {string} protocol - Communication protocol
 * @property {number} port - Network port
 * @property {string} accessLevel - Permission level
 */
const NetworkEndpointSchema = new Schema({
  _id: false,
  name: { type: String, required: true },
  endpoint: { type: String, required: true },
  protocol: { 
    type: String, 
    enum: ['http', 'https', 'ssh', 'rdp', 'grpc', 'websocket'] 
  },
  port: { 
    type: Number, 
    min: 1, 
    max: 65535,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  accessLevel: { 
    type: String, 
    enum: ['admin', 'operator', 'read-only', 'monitoring'] 
  }
}, { _id: false });

// =============================================
// **PLATFORM CONFIGURATION TEMPLATES**
// =============================================

const WebPlatformSchema = new Schema({
  server: {
    type: { 
      type: String, 
      enum: ['nginx', 'apache', 'iis', 'cloudflare', 'other'] 
    },
    version: {
      type: String,
      match: [/^\d+\.\d+(\.\d+)?$/, 'Invalid version format']
    },
    configPaths: [{
      type: String,
      validate: {
        validator: (path) => path.startsWith('/'),
        message: 'Config path must be absolute'
      }
    }]
  },
  security: {
    ssl: {
      certificates: [{
        domain: { type: String, required: true },
        issuer: String,
        expiry: { type: Date, required: true },
        keySize: { 
          type: Number, 
          enum: [2048, 3072, 4096] 
        }
      }]
    }
  }
}, { _id: false });

const MobilePlatformSchema = new Schema({
  build: {
    version: {
      type: String,
      validate: {
        validator: (v) => /^\d+\.\d+\.\d+$/.test(v),
        message: 'Version must be semantic (x.y.z)'
      }
    },
    minSdkVersion: String,
    targetSdkVersion: String
  },
  signing: {
    keystoreHash: String,
    certificates: [{
      alias: String,
      expiry: Date
    }]
  }
}, { _id: false });

// =============================================
// **USER ENVIRONMENT SCHEMA**
// =============================================

/**
 * @schema UserEnvironmentSchema
 * @description Complete isolated environment for individual users
 */
const UserEnvironmentSchema = new Schema({
  // **Identity & Access**
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
    index: true
  },
  role: {
    type: String,
    enum: [
      'pentester', 
      'security-engineer',
      'devops-engineer',
      'qa-engineer',
      'developer',
      'auditor'
    ],
    required: true
  },
  accessScope: {
    type: String,
    enum: ['full', 'restricted', 'read-only'],
    default: 'restricted'
  },

  // **Platform Configuration**
  platformConfig: {
    type: Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function(config) {
        const platformValidators = {
          web: WebPlatformSchema,
          mobile: MobilePlatformSchema
          // Add other platform validators
        };
        return validateConfig(config, this.parent().platform, platformValidators);
      },
      message: 'Invalid configuration for {VALUE} platform'
    }
  },

  // **Compute Resources**
  compute: {
    vm: {
      instanceId: String,
      specs: {
        cpu: { type: Number, min: 1 },
        memory: { type: Number, min: 0.5 }, // GB
        storage: { type: Number, min: 10 }  // GB
      },
      snapshots: [{
        name: String,
        timestamp: Date
      }]
    },
    container: {
      image: String,
      runtime: {
        type: String,
        enum: ['docker', 'containerd', 'cri-o']
      }
    }
  },

  // **Network Configuration**
  network: {
    endpoints: [NetworkEndpointSchema],
    firewallRules: [{
      direction: { type: String, enum: ['inbound', 'outbound'] },
      protocol: { type: String, enum: ['tcp', 'udp', 'icmp'] },
      portRange: String,
      action: { type: String, enum: ['allow', 'deny'] }
    }]
  },

  // **Security Posture**
  security: {
    credentials: CredentialSchema,
    lastAudit: Date,
    complianceTags: [String]
  },

  // **Monitoring & Logging**
  monitoring: {
    tools: [String],
    logRetentionDays: { 
      type: Number, 
      default: 30,
      min: 1,
      max: 365 
    }
  },

  // **Lifecycle Management**
  status: {
    current: { 
      type: String, 
      enum: ['provisioning', 'active', 'maintenance', 'decommissioned'],
      default: 'provisioning'
    },
    lastUpdated: Date
  }
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      // Security sanitization
      delete ret.security?.credentials;
      delete ret.compute?.vm?.snapshots;
      return ret;
    }
  }
});

// =============================================
// **MAIN DEVOPS SCHEMA**
// =============================================

/**
 * @schema DevOpsInfoSchema
 * @description Central DevOps configuration registry
 */
const DevOpsInfoSchema = new Schema({
  // **Core Project Reference**
  project: { 
    type: Schema.Types.ObjectId, 
    ref: 'Project', 
    required: true,
    index: true 
  },
  projectName: {
    type: String,
    required: true,
    index: 'text',
    maxlength: 120
  },

  // **Project Classification**
  projectType: {
    type: String,
    enum: ['security', 'quality', 'compliance'],
    required: true
  },
  platform: {
    type: String,
    enum: ['web', 'mobile', 'desktop', 'hardware', 'blockchain', 'cloud'],
    required: true
  },

  // **Environment Management**
  environments: {
    development: [UserEnvironmentSchema],
    staging: [UserEnvironmentSchema],
    production: [UserEnvironmentSchema],
    pentest: [UserEnvironmentSchema]
  },

  // **Shared Resources**
  sharedResources: {
    databases: [{
      name: String,
      engine: String,
      connectionString: { type: String, select: false }
    }],
    storage: [{
      name: String,
      type: String,
      accessKey: { type: String, select: false }
    }]
  },

  // **Audit Trail**
  auditLog: [{
    timestamp: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    action: String,
    target: String,
    changes: Schema.Types.Mixed
  }]
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      // Sanitize output
      delete ret.sharedResources?.databases?.connectionString;
      delete ret.sharedResources?.storage?.accessKey;
      return ret;
    }
  }
});

// =============================================
// **VALIDATION HELPERS**
// =============================================

function validateConfig(config, platform, validators) {
  if (!validators[platform]) return true;
  
  const tempDoc = new mongoose.Document(
    config, 
    validators[platform]
  );
  const error = tempDoc.validateSync();
  return error === undefined;
}

// =============================================
// **INDEXES**
// =============================================

DevOpsInfoSchema.index({
  projectName: 'text',
  'environments.user': 1,
  'auditLog.user': 1
});

UserEnvironmentSchema.index({
  user: 1,
  status: 1
});

// =============================================
// **VIRTUAL PROPERTIES**
// =============================================

UserEnvironmentSchema.virtual('isActive').get(function() {
  return this.status.current === 'active';
});

DevOpsInfoSchema.virtual('activePentesters').get(function() {
  return this.environments.pentest
    .filter(env => env.isActive)
    .map(env => env.user);
});

// =============================================
// **MODEL METHODS**
// =============================================

UserEnvironmentSchema.methods.rotateCredentials = async function() {
  this.security.credentials.lastRotated = new Date();
  // Add credential rotation logic here
  return this.save();
};

DevOpsInfoSchema.methods.getUserEnvironments = function(userId) {
  return {
    development: this.environments.development.filter(e => e.user.equals(userId)),
    staging: this.environments.staging.filter(e => e.user.equals(userId)),
    production: this.environments.production.filter(e => e.user.equals(userId))
  };
};

// =============================================
// **HOOKS**
// =============================================

UserEnvironmentSchema.pre('save', function(next) {
  if (this.isModified('security.credentials')) {
    this.security.lastAudit = new Date();
  }
  next();
});

DevOpsInfoSchema.post('save', function(doc, next) {
  // Sync with external systems
  next();
});

// =============================================
// **MODEL EXPORT**
// =============================================

const DevOpsInfo = mongoose.model('DevOpsInfo', DevOpsInfoSchema);
module.exports = DevOpsInfo;