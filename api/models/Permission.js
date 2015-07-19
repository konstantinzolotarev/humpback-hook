/**
* Permission.js
*
* @description    :: The actions a Role is granted on a particular Model and its attributes
* @humpback-docs  :: https://github.com/CaliStyle/humpback/wiki/Models#permission
* @sails-docs     :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  
    autoCreatedBy: false,

    description: [
        'Defines a particular `action` that a `Role` can perform on a `Model`.',
        'A `User` can perform an `action` on a `Model` by having a `Role` which',
        'grants the necessary `Permission`.'
    ].join(' '),

    permissions: {
        'registered': {
            'create': {action: false, relation: false},
            'read'  : {action: true,  relation: false},
            'update': {action: false, relation: false},
            'delete': {action: false, relation: false}    
        },
        'public': {
            'create': {action: false, relation: false},
            'read'  : {action: true,  relation: false},
            'update': {action: false, relation: false},
            'delete': {action: false, relation: false}
        }
    },

    attributes: {

        /**
         * The Model that this Permission applies to.
         */
        model: {
            model: 'Model',
            //required: true
        },

        /**
         * The Route that this Permission applies to.
         */
        route: {
            model: 'Route',
            //required: true
        },

        /**
         * id of particular object/record (of type 'model') that this Permission
         * applies to.
         *
         * TODO dormant. enable in future release
         */
        object: {
            type: 'integer',
            defaultsTo: -1,
            index: true
        },

        /**
         * If permission describes a Model,
         * attributes of model that this Permission governs.
         *
         * '*' wildcard is allowed and the default, 
         * else only access to specified attributes
         */
        attributes: {
            type: 'array',
            defaultsTo: ['*'],
            index: true
        },

        /**
         * action permissions based on all controller
         * actions, including custom ones
         */
        action: {
            type: 'string',
            index: true,
            notNull: true,
            type: 'string'
          
          /**
           * TODO remove enum and support permissions based on all controller
           * actions, including custom ones
           */
          /*
          enum: [
            'create',
            'read',
            'update',
            'delete'
          ]
          */
        },

        relation: {
            type: 'string',
            enum: [
                'role',
                'owner'
            ],
            defaultsTo: 'role',
            index: true
        },

        /**
         * The Role to which this Permission grants create, read, update, and/or
         * delete privileges.
         */
        role: {
            model: 'Role',
            required: true
        }
    },

    afterValidate: [
        function validateOwnerCreateTautology (permission, next) {
            if (permission.relation == 'owner' && permission.action == 'create') {
                next(new Error('Creating a Permission with relation=owner and action=create is tautological'));
            }
            next();
        }
    ]
};