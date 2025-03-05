export const pagedSchema = {
    "title": "Paged Information",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "pattern": "[-0-9a-zA-Z]{10}$",
            "maxLength": 10,
            "minLength": 10,
            "unique": true,
            "transform": [
                "prefix::emp-",
                "random-string::6",
                "uppercase"
            ],
            "group": "status",
            "title": "Id"
        },
        "employeeId": {
            "type": "string",
            "pattern": "[-0-9a-zA-Z]{10}$",
            "maxLength": 10,
            "minLength": 10,
            "unique": true,
            "transform": [
                "prefix::emp-",
                "random-string::6",
                "uppercase"
            ],
            "group": "status",
            "title": "Employee Id",
            "inputRequired": true
        },
    },
    pages: [
        {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "pattern": "[-0-9a-zA-Z]{10}$",
                    "maxLength": 10,
                    "minLength": 10,
                    "unique": true,
                    "transform": [
                        "prefix::emp-",
                        "random-string::6",
                        "uppercase"
                    ],
                    "group": "status",
                    "title": "Id"
                },
                "employeeId": {
                    "type": "string",
                    "pattern": "[-0-9a-zA-Z]{10}$",
                    "maxLength": 10,
                    "minLength": 10,
                    "unique": true,
                    "transform": [
                        "prefix::emp-",
                        "random-string::6",
                        "uppercase"
                    ],
                    "group": "status",
                    "title": "Employee Id",
                    "inputRequired": true
                },
            },
        },
        {
            "type": "object",
            "properties": {
                benefits: {
                    "type": "array",
                    "labelPosition": "top",
                    "readOnly": true,
                    "operations": [
                        "pick",
                    ],
                    "dataSource": {
                        "source": "collection",
                        "value": "benefit"
                    },
                    "items": {
                        "type": "object",
                        "layout": "horizontal",
                        "hideLabel": true,
                        "properties": {
                            "benefitId": {
                                "type": "string",
                                "group": "benefit",
                                "hideLabel": true
                            },
                            "benefitName": {
                                "type": "string",
                                "group": "benefit",
                                "hideLabel": true
                            },
                            "employeeCost": {
                                "type": "number",
                                "group": "benefit",
                                "hideLabel": true
                            }
                        }
                    },
                },
            }
        },
        {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "pattern": "[-0-9a-zA-Z]{10}$",
                    "maxLength": 10,
                    "minLength": 10,
                    "unique": true,
                    "transform": [
                        "prefix::emp-",
                        "random-string::6",
                        "uppercase"
                    ],
                    "group": "status",
                    "title": "Id"
                },
                "employeeId": {
                    "type": "string",
                    "pattern": "[-0-9a-zA-Z]{10}$",
                    "maxLength": 10,
                    "minLength": 10,
                    "unique": true,
                    "transform": [
                        "prefix::emp-",
                        "random-string::6",
                        "uppercase"
                    ],
                    "group": "status",
                    "title": "Employee Id",
                    "inputRequired": true
                },
            },
        },

    ]
}