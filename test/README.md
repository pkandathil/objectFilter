The purpose of this repo is to implement the objectFilter method.

It takes two pieces of input
* An input object
* A filter `cartItem.product.characteristic.value=34,56`. This is a path in the object that states the only allowable values that should be returned.


Following is an example of the input object


```
{
  "ShoppingCart": {
    "id": "123-456-789",
    "characteristic": [
      {
        "name": "123456",
        "value": null,
        "displayName": "Test char 1",
        "originalDisplayName": "Test char 1",
        "description": "Test characteristic object 1"
      },
      {
        "name": "78910",
        "value": null,
        "displayName": "Test char 2",
        "originalDisplayName": "Test char 2",
        "description": "Test characteristic object 2"
      }
    ],
    "cartItem": [
      {
        "action": "Add",
        "id": "1",
        "product": {
          "id": null,
          "displayName": "Test product 1",
          "originalName": "Test product 1",
          "characteristic": [
            {
              "name": "Testing 1",
              "value": "12"
            },
            {
              "name": "Testing 2",
              "value": "34"
            }
          ]
        }
      },
      {
        "action": "Add",
        "id": "2",
        "product": {
          "id": null,
          "displayName": "Test product 2",
          "originalName": "Test product 2",
          "characteristic": [
            {
              "name": "Testing 3",
              "value": "56"
            },
            {
              "name": "Testing 4",
              "value": "78"
            }
          ]
        }
      }
    ]
  }
}
```

The output:

```
{
  "ShoppingCart": {
      "id": "123-456-789",
      "characteristic": [
        {
          "name": "123456",
          "value": null,
          "displayName": "Test char 1",
          "originalDisplayName": "Test char 1",
          "description": "Test characteristic object 1"
        },
        {
          "name": "78910",
          "value": null,
          "displayName": "Test char 2",
          "originalDisplayName": "Test char 2",
          "description": "Test characteristic object 2"
        }
      ],
      "cartItem": [
        {
          "action": "Add",
          "id": "1",
          "product": {
            "id": null,
            "displayName": "Test product 1",
            "originalName": "Test product 1",
            "characteristic": [
              {
                "name": "Testing 2",
                "value": "34"
              }
            ]
          }
        },
        {
          "action": "Add",
          "id": "2",
          "product": {
            "id": null,
            "displayName": "Test product 2",
            "originalName": "Test product 2",
            "characteristic": [
              {
                "name": "Testing 3",
                "value": "56"
              }
            ]
          }
        }
      ]
    }
  }
}
```