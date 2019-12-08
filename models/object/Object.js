const {Schema, model} = require('mongoose');
const paginate = require('mongoose-paginate');

const ObjectSchema = new Schema({
    acceppt: {
      type: Boolean,
      default: false
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    general: {
      identifier: [{
        _id: false,
        catalog: String,
        entry: String
      }],
      title: {
        language: String,
        content: String
      },
      language: [String],
      description: [{
        _id: false,
        language: String,
        content: String
      }],
      keyword: [{
        _id: false,
        language: String,
        content: String
      }],
      coverage: [{
        _id: false,
        language: String,
        content: String
      }],
      structure: String,
      aggregationLevel: String
    },
    lifecyle: {
      version: {
        language: String,
        content: String
      },
      status: String,
      contribute: [{
        _id: false,
        role: String,
        entity: [{
          _id: false,
          givenName: String,
          lastName: String,
          email: String,
          organization: String
        }],
        date: Date
      }]
    },
    metaMetadata: {
      identifier: [{
        _id: false,
        catalog: String,
        entry: String
      }],
      contribute: [{
        _id: false,
        role: String,
        entity: [{
          _id: false,
          givenName: String,
          lastName: String,
          email: String,
          organization: String
        }],
        date: Date
      }],
      metadataSchema: [String],
      language: String
    },
    technical: {
      format: [String],
      size: Number,
      location: [String],
      requeriment: [{
        _id: false,
        orComposite: [{
          _id: false,
          type: String,
          name: String,
          minimumVersion: String,
          maximumVersion: String
        }]
      }],
      installationRemarks: {
        language: String,
        content: String
      },
      otherPlatformRequeriments: {
        language: String,
        content: String
      },
      duration: Date
    },
    educational: [{
      _id: false,
      interactivityType: String,
      learningResourceType: [String],
      interactivityLevel: String,
      semanticDensity: String,
      intendedEndUserRole: [String],
      context: [String],
      typicalAgeRange: [{
        _id: false,
        language: String,
        content: String
      }],
      difficulty: String,
      typicalLearningTime: Date,
      description: [{
        _id: false,
        language: String,
        content: String
      }],
      language: [String]
    }],
    rights: {
      cost: String,
      copyAndOtherRestrictions: String,
      description: {
        language: String,
        content: String
      }
    },
    relation: [{
      _id: false,
      kind: String,
      resource: {
        identifier: [{
          _id: false,
          catalog: String,
          entry: String
        }],
        description: [{
          _id: false,
          language: String,
          content: String
        }]
      }
    }],
    annotation: [{
      _id: false,
      entity: {
        givenName: String,
        lastName: String,
        email: String,
        organization: String
      },
      date: Date,
      description: {
        language: String,
        content: String
      }
    }],
    classification: [{
      _id: false,
      purpose: String,
      taxonPath: [{
        _id: false,
        source: {
          language: String,
          content: String
        },
        taxon: [{
          _id: false,
          id: Number,
          entry: {
            language: String,
            content: String
          }
        }],
        description: {
          language: String,
          content: String
        },
        keyword: [{
          _id: false,
          language: String,
          content: String
        }]
      }]
    }]
  },
  {
    timestamps: true
  });

ObjectSchema.plugin(paginate);

module.exports = model('Object', ObjectSchema);
